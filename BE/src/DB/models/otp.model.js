import mongoose from "mongoose";
import { hash } from "../../utils/index.js";
import { sendEmail } from "../../service/sendEmail.js";
import { otpEmailTemplate } from "../../utils/emailEvents/emailTemplate.js";

export const otpTypes = {
  confirmEmail: "confirmEmail",
  forgotPassword: "forgotPassword"
};

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  code: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: Object.values(otpTypes),
    required: true,
    default: otpTypes.confirmEmail
  },
  attempts: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean
  },
  expireAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// ── TTL Index: auto-delete expired OTPs ──
otpSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// ── Pre-save: hash OTP code & populate user email ──
otpSchema.pre("save", async function () {
  this._wasNew = this.isNew;
  if (this.isModified("code")) {
    this._plainCode = this.code;
    this.code = await hash({ plaintext: this.code });
    await this.populate({
      path: "userId",
      select: "email name"
    });
  }
});

// ── Post-save: send email with OTP ──
otpSchema.post("save", async function () {
  if (this._wasNew && this._plainCode && this.userId?.email) {
    const email = this.userId.email;
    const subject =
      this.type === otpTypes.forgotPassword
        ? "🔑 DriveEase — Reset Your Password"
        : "🚗 DriveEase — Verify Your Email";

    const html = otpEmailTemplate(this._plainCode, email);

    try {
      await sendEmail({ to: email, subject, html });
    } catch (err) {
      console.error("Failed to send OTP email:", err.message);
    }
  }
});

export const otpModel = mongoose.models.otps || mongoose.model("otps", otpSchema);