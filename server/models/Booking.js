import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "listing" },
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "canceled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const BookingModel = mongoose.model("booking", bookingSchema);

export default BookingModel;
