import mongoose from "mongoose";

const PackageItemSchema = new mongoose.Schema(
  {
    packageId: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    currentStatus: {
      type: String,
      required: true,
      enum: ["In Progress", "Pending", "Delivered"],
    },

    additionalInstructions: {
      type: String,
      required: true,
    },

    deliveryDetails: {
      deliveryDate: { type: Date, required: true },
      deliveryTime: { type: String, required: true },
      assignedDriver: { type: String, required: true },
      trackingNumber: { type: String, required: true },
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const PackageItem = mongoose.model("PackageItem", PackageItemSchema);

export default PackageItem;
