import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  image: {
    type: {
      secure_url: String,
      public_id: String
    },
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  seating_capacity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  fuel_type: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price_per_day: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true,
    lowercase: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const carModel = mongoose.models.cars || mongoose.model("cars", carSchema);