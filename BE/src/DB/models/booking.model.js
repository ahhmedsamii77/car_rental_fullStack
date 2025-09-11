import mongoose from "mongoose";
export const bookingStatus = {
  pending: "pending",
  confirmed: "confirmed",
  cancelled: "cancelled"
}
const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cars",
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  pickupDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(bookingStatus),
    default: bookingStatus.pending
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export const bookingModel = mongoose.models.bookings || mongoose.model("bookings", bookingSchema);