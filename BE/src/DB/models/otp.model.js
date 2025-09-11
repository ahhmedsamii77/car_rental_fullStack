import mongoose from "mongoose";

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
  attempts: {
    type: Number,
    default: 0
  },
  expiredAt: {
    type: Number  ,
    required: true
  }
}, {
  timestamps: true
});

export const otpModel = mongoose.models.otps || mongoose.model("otps", otpSchema);