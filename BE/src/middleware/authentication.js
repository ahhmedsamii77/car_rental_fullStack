import { revokeTokenModel, userModel } from "../DB/index.js";
import { verifyToken } from "../utils/index.js";

export async function authentication(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Error("authorization not found", { cause: 401 });
  }
  let signature = "";
  const [prefix, token] = authorization.split(" ");
  if (prefix == "Bearer") {
    signature = process.env.ACCESS_SECRET_USER;
  } else if (prefix == "Admin") {
    signature = process.env.ACCESS_SECRET_ADMIN;
  } else {
    throw new Error("invalid prefix", { cause: 401 });
  }
  if (!signature) {
    throw new Error("server misconfiguration: missing JWT secret", { cause: 500 });
  }
  const decoded = await verifyToken({ token, signature });
  const isRevoked = await revokeTokenModel.findOne({ idToken: decoded.jti });
  if (isRevoked) {
    throw new Error("token is revoked please login again", { cause: 401 });
  }
  const user = await userModel.findById(decoded.id);
  if (!user) {
    throw new Error("user not found", { cause: 404 });
  }
  if (!user.confirmedAt) {
    throw new Error("user not confirmed", { cause: 403 });
  }
  if (user.isBanned) {
    throw new Error("user is banned", { cause: 403 });
  }
  // reject tokens issued before a password/credentials change
  if (
    user.changeCredentialsTime &&
    decoded.iat * 1000 < user.changeCredentialsTime.getTime()
  ) {
    throw new Error("credentials changed, please login again", { cause: 401 });
  }
  req.user = user;
  req.decoded = decoded;
  return next();
}