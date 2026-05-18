import { EventEmitter } from "node:events";
import { nanoid } from "nanoid"
import { hash } from "../index.js"
import { otpModel } from "../../DB/index.js";
import { sendEmail } from "../../service/sendEmail.js"
import { otpEmailTemplate } from "./emailTemplate.js"

export const eventEmitter = new EventEmitter();

eventEmitter.on("confirmEmail", async (data) => {
  const { userId, email } = data;
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
});