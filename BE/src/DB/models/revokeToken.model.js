import mongoose from "mongoose";

const revokeTokenSchema = new mongoose.Schema({
  idToken: {
    type: String,
    required: true
  },
  expiredAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

export const revokeTokenModel = mongoose.models.revokeTokens || mongoose.model("revokeTokens", revokeTokenSchema);
