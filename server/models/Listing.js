import mongoose from "mongoose";

const listingSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    availableFrom: { type: Date, required: true },
    availableTo: { type: Date, required: true },
    capacity: { type: Number, required: true },
    numberOfRooms: { type: Number, required: true },
    numberOfBathrooms: { type: Number, required: true },
    amenities: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["available", "unavailable", "pending"],
      default: "available",
    },
    rating: { type: Number, default: 5 },
    categories: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "booking" }],
  },
  { timestamps: true }
);

const ListingModel = mongoose.model("listing", listingSchema);

export default ListingModel;
