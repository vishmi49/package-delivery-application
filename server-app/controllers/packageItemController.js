import asyncHandler from "express-async-handler";
import PackageItem from "../models/PackageItemModel.js";
import User from "../models/UserModel.js";
import { isValid, parseISO } from "date-fns";

export const createPackageItem = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const deliveryDate = req.body.deliveryDetails?.deliveryDate;
    if (!deliveryDate || !isValid(parseISO(deliveryDate)) || new Date(deliveryDate) < new Date()) {
      return res.status(400).json({ message: "Invalid delivery date. Must be a valid future date in ISO 8601 format." });
    }

    const dataObject = {
      packageId: req.body.packageId,
      name: req.body.name,
      description: req.body.description,
      priority: req.body.priority,
      price: req.body.price,
      currentStatus: req.body.currentStatus,
      additionalInstructions: req.body.additionalInstructions,
      deliveryDetails: {
        deliveryDate,
        deliveryTime: req.body.deliveryDetails.deliveryTime,
        assignedDriver: req.body.deliveryDetails.assignedDriver,
        trackingNumber: req.body.deliveryDetails.trackingNumber,
      },
      customer: user._id,
    };

    console.log("Data object:", dataObject);

    const createdPackageItem = await PackageItem.create(dataObject);

    if (!createdPackageItem) {
      return res.status(400).json({
        message: "Package item not created",
      });
    }

    return res.status(200).json({
      message: "Package item created successfully",
      packageItem: createdPackageItem,
    });
  } catch (error) {
    console.error("Error creating package item:", error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});
