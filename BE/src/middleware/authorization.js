export function authorization(accessRoles = []) {
  return (req, res, next) => {
    if (!accessRoles.includes(req.user.role)) {
      throw new Error("you are not authorized", { cause: 403 });
    } else {
      return next();
    }
  }
}