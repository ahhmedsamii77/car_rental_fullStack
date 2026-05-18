import { nanoid } from "nanoid";
import { hash } from "../index.js";
import { otpModel } from "../../DB/index.js";
import { sendEmail } from "../../service/sendEmail.js";
import { otpEmailTemplate } from "./emailTemplate.js";

/** Direct async function — safe for Vercel serverless (no EventEmitter fire-and-forget) */
export async function sendConfirmEmail({ userId, email }) {
  const code = nanoid(4);
  const hashCode = await hash({ plaintext: code });

  await otpModel.create({
    userId,
    code: hashCode,
    expiredAt: Date.now() + 5 * 60 * 1000,
  });

  const html = otpEmailTemplate(code, email);

  const isSend = await sendEmail({
    to: email,
    subject: "🚗 DriveEase — Verify Your Email",
    html,
  });

  if (!isSend) {
    throw new Error("error send email", { cause: 500 });
  }
}