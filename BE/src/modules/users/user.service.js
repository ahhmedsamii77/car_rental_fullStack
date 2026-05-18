import { nanoid } from "nanoid";
import {
  otpModel,
  revokeTokenModel,
  userModel,
  userRoles,
} from "../../DB/index.js";
import {
  hash,
  eventEmitter,
  compare,
  generateToken,
  verifyToken,
} from "../../utils/index.js";
import cloudinary from "../../utils/cloudinary/index.js";
// register
export async function register(req, res, next) {
  const { name, email, password } = req.body;
  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    throw new Error("user already exist", { cause: 400 });
  }

  const hashPassword = await hash({ plaintext: password });

  const user = await userModel.create({
    name,
    email,
    password: hashPassword,
  });
  eventEmitter.emit("confirmEmail", { userId: user._id, email });
  return res.status(201).json({ message: "user created successfully" });
}

// confirm email
export async function confirmEmail(req, res, next) {
  const { email, otp } = req.body;
  const user = await userModel.findOne({ email, confirmed: false });
  if (!user) {
    throw new Error("user not found or already confirmed", { cause: 404 });
  }
  if (user.isBanned) {
    throw new Error("user is banned please login", { cause: 403 });
  }
  const otpInDB = await otpModel.findOne({ userId: user._id });
  if (!otpInDB) {
    throw new Error("otp not found", { cause: 404 });
  }
  if (otpInDB.attempts >= 5) {
    user.isBanned = true;
    user.bannedAt = Date.now();
    await user.save();
    await otpModel.deleteOne({ userId: user._id });
    throw new Error("user is banned please login", { cause: 403 });
  }
  if (otpInDB.expiredAt < Date.now()) {
    await otpModel.deleteOne({ userId: user._id });
    throw new Error("otp expired", { cause: 400 });
  }
  const isOtpMatch = await compare({
    plaintext: otp,
    ciphertext: otpInDB.code,
  });
  if (!isOtpMatch) {
    otpInDB.attempts++;
    await otpInDB.save();
    throw new Error("otp not match", { cause: 400 });
  }
  user.confirmed = true;
  await user.save();
  await otpModel.deleteOne({ userId: user._id });
  return res
    .status(200)
    .json({ message: "user confirmed successfully please login" });
}

// login
export async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("user not found", { cause: 404 });
  }
  const isPasswordMatch = await compare({
    plaintext: password,
    ciphertext: user.password,
  });
  if (!isPasswordMatch) {
    throw new Error("password not match", { cause: 400 });
  }
  if (!user.confirmed) {
    if (user.isBanned) {
      if (user.bannedAt + 5 * 60 * 1000 > Date.now()) {
        throw new Error(
          `user is banned please login again after ${Math.ceil(
            (user.bannedAt + 5 * 60 * 1000 - Date.now()) / 1000 / 60
          )} minutes`,
          { cause: 403 }
        );
      } else {
        user.isBanned = undefined;
        user.bannedAt = undefined;
        await user.save();
        eventEmitter.emit("confirmEmail", { userId: user._id, email });
        return res.status(200).json({ message: "code send to your email" });
      }
    }
    eventEmitter.emit("confirmEmail", { userId: user._id, email });
    return res.status(200).json({ message: "code send to your email" });
  }
  const jwtid = nanoid();
  const access_token = await generateToken({
    payload: { id: user._id, role: user.role },
    signature:
      user.role == userRoles.user
        ? process.env.ACCESS_SECRET_USER
        : process.env.ACCESS_SECRET_ADMIN,
    options: { expiresIn: "1d", jwtid },
  });
  const refersh_token = await generateToken({
    payload: { id: user._id, role: user.role },
    signature:
      user.role == userRoles.user
        ? process.env.REFERSH_SECRET_USER
        : process.env.REFERSH_SECRET_ADMIN,
    options: { expiresIn: "1y", jwtid },
  });
  return res
    .status(200)
    .json({ message: "login successfully", access_token, refersh_token });
}

// refersh token
export async function refershToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Error("authorization not found", { cause: 401 });
  }
  let signature = "";
  const [prefix, token] = authorization.split(" ");
  if (prefix == "Bearer") {
    signature = process.env.REFERSH_SECRET_USER;
  } else if (prefix == "Admin") {
    signature = process.env.REFERSH_SECRET_ADMIN;
  } else {
    throw new Error("invalid prefix", { cause: 401 });
  }
  const decoded = await verifyToken({ token, signature });
  const user = await userModel.findById(decoded.id);
  if (!user) {
    throw new Error("user not found", { cause: 404 });
  }
  const jwtid = nanoid();
  const access_token = await generateToken({
    payload: { id: user._id, role: user.role },
    signature:
      user.role == userRoles.user
        ? process.env.ACCESS_SECRET_USER
        : process.env.ACCESS_SECRET_ADMIN,
    options: { expiresIn: "1d", jwtid },
  });
  const refersh_token = await generateToken({
    payload: { id: user._id, role: user.role },
    signature:
      user.role == userRoles.user
        ? process.env.REFERSH_SECRET_USER
        : process.env.REFERSH_SECRET_ADMIN,
    options: { expiresIn: "1y", jwtid },
  });
  return res.status(200).json({
    message: "refersh token successfully",
    access_token,
    refersh_token,
  });
}

// revoke token
export async function revokeToken(req, res, next) {
  await revokeTokenModel.create({
    idToken: req.decoded.jti,
    expiredAt: req.decoded.exp,
  });
  return res.status(200).json({ message: "token revoked successfully" });
}

// user info
export async function getUserInfo(req, res, next) {
  return res.status(200).json({ message: "user info", user: req.user });
}

// change rule to admin
export async function changeRuleToAdmin(req, res, next) {
  req.user.role = userRoles.admin;
  await req.user.save();
  return res.status(200).json({ message: "change rule to admin successfully" });
}

// update profile image
export async function updteProfileImage(req, res, next) {
  if (req.user.profileImage) {
    await cloudinary.uploader.destroy(req?.user?.profileImage?.public_id);
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: "car-renta/users/profileImage" }
  );
  req.user.profileImage = { secure_url, public_id };
  await req.user.save();
  return res
    .status(200)
    .json({ message: "profile image updated successfully" });
}
