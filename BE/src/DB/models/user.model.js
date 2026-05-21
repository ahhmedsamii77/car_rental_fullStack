import mongoose from "mongoose";
import { hash } from "../../utils/index.js";

export const userRoles = {
  user: "user",
  admin: "admin"
};

export const genderTypes = {
  male: "male",
  female: "female"
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  phone: { type: String },
  address: { type: String },
  gender: {
    type: String,
    enum: Object.values(genderTypes),
    default: genderTypes.male,
    lowercase: true
  },
  confirmedAt: { type: Date },
  role: {
    type: String,
    enum: Object.values(userRoles),
    default: userRoles.user
  },
  profileImage: {
    type: {
      secure_url: String,
      public_id: String
    }
  },
  changeCredentialsTime: { type: Date },
  isBanned: Boolean,
  bannedAt: Number,
  deletedAt: { type: Date },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  strictQuery: true
});

// ── Virtual: OTP relation ──
userSchema.virtual("otp", {
  ref: "otps",
  localField: "_id",
  foreignField: "userId"
});

// ── Pre-save: hash password ──
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash({ plaintext: this.password });
  }
});

// ── Pre-find: paranoid soft-delete filter ──
userSchema.pre(/^find/, function () {
  const query = this.getQuery();
  const { paranoid, ...rest } = query;
  if (paranoid === false) {
    this.setQuery({ ...rest });
  } else {
    this.setQuery({
      ...query,
      deletedAt: { $exists: false }
    });
  }
});

// ── Post-update: cascade soft-delete / restore to bookings ──
userSchema.post(
  ["findOneAndUpdate", "updateOne", "updateMany"],
  async function (res) {
    if (!res) return;
    if (res.modifiedCount !== undefined && !res.modifiedCount) return;

    const update = this.getUpdate();
    const deletedAt = update?.deletedAt ?? update?.$set?.deletedAt;
    const deletedBy = update?.deletedBy ?? update?.$set?.deletedBy;

    if (!deletedAt) return;

    const query = this.getQuery();
    const userId = query._id;
    if (!userId) return;

    const bookingModel = mongoose.models.bookings;
    if (!bookingModel) return;

    if (deletedAt) {
      await bookingModel.updateMany(
        { userId, deletedAt: { $exists: false } },
        {
          $set: { deletedAt, deletedBy },
        }
      );
    }
  }
);

export const userModel = mongoose.models.users || mongoose.model("users", userSchema);