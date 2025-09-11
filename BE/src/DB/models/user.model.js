import mongoose from "mongoose";
export const userRoles = {
  user: "user",
  admin: "admin"
}
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  profileImage:{
    type: {
      secure_url: String,
      public_id: String
    }
  },
  isBanned: Boolean,
  bannedAt: Number,
  role: {
    type: String,
    enum: Object.values(userRoles),
    default: userRoles.user
  }
}, {
  timestamps: true
});

export const userModel = mongoose.models.users || mongoose.model("users", userSchema);