import { Router } from "express"
import * as US from "./user.service.js";
import * as UV from "./user.validation.js";
import { authentication, Multer, validation, customExtensions , authorization } from "../../middleware/index.js"
import { userRoles } from "../../DB/index.js";
export const userRouter = Router();

// register
userRouter.post("/register", validation(UV.registerSchema), US.register);

// comfirm email
userRouter.patch("/confirmEmail", validation(UV.confirmEmailSchema), US.confirmEmail);

// login
userRouter.post("/login", validation(UV.loginSchema), US.login);

// refersh token
userRouter.post("/refershToken", US.refershToken);

// revoke token
userRouter.patch("/revokeToken", authentication, US.revokeToken);

// user info
userRouter.get("/userInfo", authentication, US.getUserInfo);

// change rule to admin
userRouter.patch("/changeRuleToAdmin", authentication, US.changeRuleToAdmin);

// update profile image
userRouter.patch("/updateProfileImage", authentication, Multer(customExtensions.image).single("image"), US.updteProfileImage);