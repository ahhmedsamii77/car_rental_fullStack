import joi from "joi";
import { generalRules } from "../../utils/index.js"

export const registerSchema = {
  body: joi.object({
    name: joi.string().required(),
    email: generalRules.email.required(),
    password: generalRules.password.required(),
    confirmPassword: joi.string().required().valid(joi.ref("password")),
  }).required()
}

export const confirmEmailSchema = {
  body: joi.object({
    email: generalRules.email.required(),
    otp: joi.string().required().length(4)
  }).required()
}

export const loginSchema = {
  body: joi.object({
    email: generalRules.email.required(),
    password: generalRules.password.required(),
  }).required()
}

export const resendOtpSchema = {
  body: joi.object({
    email: generalRules.email.required(),
  }).required()
}

export const forgetPasswordSchema = {
  body: joi.object({
    email: generalRules.email.required(),
  }).required()
}

export const verifyResetOtpSchema = {
  body: joi.object({
    email: generalRules.email.required(),
    otp: joi.string().required().length(4),
  }).required()
}

export const resetPasswordSchema = {
  body: joi.object({
    email: generalRules.email.required(),
    password: generalRules.password.required(),
    confirmPassword: joi.string().required().valid(joi.ref("password")),
  }).required()
}
