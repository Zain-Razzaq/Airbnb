import mongoose from "mongoose";

const listingSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    image: [{ type: String }],
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
      enum: ["available", "unavailable"],
      default: "available",
    },
    rating: { type: Number, default: 5 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
    hostId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const ListingModel = mongoose.model("listing", listingSchema);

export default ListingModel;
