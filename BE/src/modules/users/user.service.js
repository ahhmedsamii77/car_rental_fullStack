import { nanoid } from "nanoid";
import {
  otpModel,
  otpTypes,
  revokeTokenModel,
  userModel,
  userRoles,
} from "../../DB/index.js";
import {
  hash,
  compare,
  generateToken,
  verifyToken,
} from "../../utils/index.js";
import cloudinary from "../../utils/cloudinary/index.js";

// ─── Helpers ────────────────────────────────────────────────

/** Generate & persist a hashed OTP (email is sent automatically via OTP post-save hook) */
async function sendOtp(userId, otpType = otpTypes.confirmEmail) {
  const code = nanoid(4);
  await otpModel.create({
    code,
    userId,
    type: otpType,
    expireAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
  });
}


/** Build access + refresh tokens for a user */
async function createLoginCredentials(user) {
  const jwtid = nanoid();
  const access_token = await generateToken({
    payload: { id: user._id, role: user.role },
    signature:
      user.role === userRoles.user
        ? process.env.ACCESS_SECRET_USER
        : process.env.ACCESS_SECRET_ADMIN,
    options: { expiresIn: "1d", jwtid },
  });
  const refresh_token = await generateToken({
    payload: { id: user._id, role: user.role },
    signature:
      user.role === userRoles.user
        ? process.env.REFERSH_SECRET_USER
        : process.env.REFERSH_SECRET_ADMIN,
    options: { expiresIn: "10d", jwtid },
  });
  return { access_token, refresh_token };
}

// ─── Auth: Register ─────────────────────────────────────────

export async function register(req, res, next) {
  const { name, email, password } = req.body;
  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    throw new Error("user already exist", { cause: 400 });
  }
  // password is hashed automatically via user model pre-save hook
  const user = await userModel.create({ name, email, password });
  await sendOtp(user._id, otpTypes.confirmEmail);
  return res.status(201).json({ message: "user created successfully" });
}

// ─── Auth: Confirm Email ────────────────────────────────────

export async function confirmEmail(req, res, next) {
  const { email, otp } = req.body;
  const user = await userModel.findOne(
    { email, confirmedAt: { $exists: false } },
    undefined,
    {
      populate: {
        path: "otp",
        match: {
          type: otpTypes.confirmEmail,
          isVerified: { $exists: false },
        },
      },
    }
  );
  if (!user) {
    throw new Error("user not found or already confirmed", { cause: 404 });
  }
  if (user.isBanned) {
    throw new Error("user is banned please login", { cause: 403 });
  }
  if (!user.otp?.length) {
    throw new Error("otp not found or expired", { cause: 404 });
  }
  // check attempts
  const otpDoc = user.otp[0];
  if (otpDoc.attempts >= 5) {
    user.isBanned = true;
    user.bannedAt = Date.now();
    await user.save();
    await otpModel.deleteMany({ userId: user._id, type: otpTypes.confirmEmail });
    throw new Error("user is banned please login", { cause: 403 });
  }
  const isOtpMatch = await compare({
    plaintext: otp,
    ciphertext: otpDoc.code,
  });
  if (!isOtpMatch) {
    otpDoc.attempts++;
    await otpDoc.save();
    throw new Error("otp not match", { cause: 400 });
  }
  user.confirmedAt = new Date();
  await user.save();
  await otpModel.deleteMany({ userId: user._id, type: otpTypes.confirmEmail });
  return res
    .status(200)
    .json({ message: "user confirmed successfully please login" });
}

// ─── Auth: Resend OTP ───────────────────────────────────────

export async function resendOtp(req, res, next) {
  const { email } = req.body;
  const user = await userModel.findOne(
    { email, confirmedAt: { $exists: false } },
    undefined,
    {
      populate: {
        path: "otp",
        match: {
          type: otpTypes.confirmEmail,
          isVerified: { $exists: false },
        },
      },
    }
  );
  if (!user) {
    throw new Error("account not found or already confirmed", { cause: 404 });
  }
  if (user.otp?.length) {
    throw new Error(
      "An unexpired OTP already exists. Please check your email or try again later.",
      { cause: 409 }
    );
  }
  await sendOtp(user._id, otpTypes.confirmEmail);
  return res.status(200).json({ message: "OTP resent successfully" });
}

// ─── Auth: Login ────────────────────────────────────────────

export async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("user not found", { cause: 404 });
  }
  if (!user.confirmedAt) {
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
        await sendOtp(user._id, otpTypes.confirmEmail);
        return res.status(200).json({ message: "code sent to your email" });
      }
    }
    await sendOtp(user._id, otpTypes.confirmEmail);
    return res.status(200).json({ message: "code sent to your email" });
  }
  const isPasswordMatch = await compare({
    plaintext: password,
    ciphertext: user.password,
  });
  if (!isPasswordMatch) {
    throw new Error("password not match", { cause: 400 });
  }
  const { access_token, refresh_token } = await createLoginCredentials(user);
  return res.status(200).json({
    message: "login successfully",
    access_token,
    refersh_token: refresh_token,   // keep FE localStorage key consistent
    role: user.role,
  });
}


// ─── Auth: Forgot Password — Send OTP ──────────────────────

export async function sendResetPasswordOtp(req, res, next) {
  const { email } = req.body;
  const user = await userModel.findOne(
    {
      email,
      confirmedAt: { $exists: true },
    },
    undefined,
    {
      populate: {
        path: "otp",
        match: { type: otpTypes.forgotPassword },
      },
    }
  );
  if (!user) {
    throw new Error("No matching account with this email.", { cause: 404 });
  }
  if (user.otp?.length) {
    throw new Error(
      "An unexpired OTP already exists. Please check your email or try again later.",
      { cause: 409 }
    );
  }
  await sendOtp(user._id, otpTypes.forgotPassword);
  return res
    .status(200)
    .json({ message: "reset password OTP sent to your email" });
}

// ─── Auth: Forgot Password — Verify OTP ────────────────────

export async function verifyResetPasswordOtp(req, res, next) {
  const { email, otp } = req.body;
  const user = await userModel.findOne(
    {
      email,
      confirmedAt: { $exists: true },
    },
    undefined,
    {
      populate: {
        path: "otp",
        match: {
          type: otpTypes.forgotPassword,
          isVerified: { $exists: false },
        },
      },
    }
  );
  if (!user) {
    throw new Error("No matching account with this email.", { cause: 404 });
  }
  if (!user.otp?.length) {
    throw new Error("No active OTP found. Please request a new one.", {
      cause: 400,
    });
  }
  const isOtpMatch = await compare({
    plaintext: otp,
    ciphertext: user.otp[0].code,
  });
  if (!isOtpMatch) {
    throw new Error("Invalid OTP or OTP has expired", { cause: 400 });
  }
  await otpModel.updateOne(
    {
      userId: user._id,
      type: otpTypes.forgotPassword,
      isVerified: { $exists: false },
    },
    { $set: { isVerified: true } }
  );
  return res.status(200).json({ message: "OTP verified successfully" });
}

// ─── Auth: Forgot Password — Reset Password ────────────────

export async function resetPassword(req, res, next) {
  const { email, password } = req.body;
  const user = await userModel.findOne(
    {
      email,
      confirmedAt: { $exists: true },
    },
    undefined,
    {
      populate: {
        path: "otp",
        match: {
          type: otpTypes.forgotPassword,
          isVerified: true,
        },
      },
    }
  );
  if (!user) {
    throw new Error("No matching account with this email.", { cause: 404 });
  }
  if (!user.otp?.length) {
    throw new Error("Please verify OTP before resetting password.", {
      cause: 400,
    });
  }
  user.password = password; // hashed via pre-save hook
  user.changeCredentialsTime = new Date();
  await user.save();
  await otpModel.deleteMany({
    userId: user._id,
    type: otpTypes.forgotPassword,
  });
  return res.status(200).json({ message: "password reset successfully" });
}

// ─── Auth: Refresh Token ────────────────────────────────────

export async function refreshToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Error("authorization not found", { cause: 401 });
  }
  let signature = "";
  const [prefix, token] = authorization.split(" ");
  if (prefix === "Bearer") {
    signature = process.env.REFERSH_SECRET_USER;
  } else if (prefix === "Admin") {
    signature = process.env.REFERSH_SECRET_ADMIN;
  } else {
    throw new Error("invalid prefix", { cause: 401 });
  }
  const decoded = await verifyToken({ token, signature });
  const user = await userModel.findById(decoded.id);
  if (!user) {
    throw new Error("user not found", { cause: 404 });
  }
  const { access_token, refresh_token } = await createLoginCredentials(user);
  return res.status(200).json({
    message: "refresh token successfully",
    access_token,
    refersh_token: refresh_token,   // keep FE localStorage key consistent
  });
}

// ─── Auth: Revoke Token ─────────────────────────────────────

export async function revokeToken(req, res, next) {
  await revokeTokenModel.create({
    idToken: req.decoded.jti,
    expiredAt: req.decoded.exp,
  });
  return res.status(200).json({ message: "token revoked successfully" });
}

// ─── User: Get Info ─────────────────────────────────────────

export async function getUserInfo(req, res, next) {
  return res.status(200).json({ message: "user info", user: req.user });
}

// ─── User: Change Role to Admin ─────────────────────────────

export async function changeRuleToAdmin(req, res, next) {
  req.user.role = userRoles.admin;
  await req.user.save();
  return res.status(200).json({ message: "change rule to admin successfully" });
}

// ─── User: Update Profile Image ─────────────────────────────

export async function updateProfileImage(req, res, next) {
  if (req.user.profileImage?.public_id) {
    await cloudinary.uploader.destroy(req.user.profileImage.public_id);
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
