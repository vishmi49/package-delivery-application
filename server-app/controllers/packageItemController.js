import asyncHandler from "express-async-handler";
import PackageItem from "../models/PackageItemModel.js";
import User from "../models/UserModel.js";
import { isValid, parseISO } from "date-fns";

export const createPackageItem = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });
    const isAuth = req.oidc.isAuthenticated() || user.email;

    if (!isAuth) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(401).json({
        message: "Not authorized to create package item",
      });
    }

    const deliveryDate = req.body.deliveryDetails?.deliveryDate;
    if (
      !deliveryDate ||
      !isValid(parseISO(deliveryDate)) ||
      new Date(deliveryDate) < new Date()
    ) {
      return res.status(400).json({
        message:
          "Invalid delivery date. Must be a valid future date in ISO 8601 format.",
      });
    }

    const {
      packageId,
      packageName,
      description,
      priority,
      price,
      currentStatus,
      additionalInstructions,
      deliveryDetails,
    } = req.body;

    if (!packageName || typeof packageName !== "string") {
      return res
        .status(400)
        .json({ message: "Invalid or missing package name" });
    }

    if (!description || typeof description !== "string") {
      return res
        .status(400)
        .json({ message: "Invalid or missing description" });
    }

    if (!priority || !["Low", "Medium", "High"].includes(priority)) {
      return res.status(400).json({ message: "Invalid or missing priority" });
    }

    if (!price || typeof price !== "number") {
      return res.status(400).json({ message: "Invalid or missing price" });
    }
    if (
      !currentStatus ||
      !["In Progress", "Pending", "Delivered"].includes(currentStatus)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or missing current status" });
    }

    if (!additionalInstructions || typeof additionalInstructions !== "string") {
      return res.status(400).json({
        message: "Invalid or missing additional instructions",
      });
    }

    if (
      !deliveryDetails.deliveryTime ||
      typeof deliveryDetails.deliveryTime !== "string"
    ) {
      return res.status(400).json({
        message: "Invalid or missing delivery time",
      });
    }

    if (
      !deliveryDetails.assignedDriver ||
      typeof deliveryDetails.assignedDriver !== "string"
    ) {
      return res.status(400).json({
        message: "Invalid or missing assigned driver",
      });
    }

    if (
      !deliveryDetails.trackingNumber ||
      typeof deliveryDetails.trackingNumber !== "string"
    ) {
      return res.status(400).json({
        message: "Invalid or missing tracking number",
      });
    }

    const dataObject = {
      packageId: req.body.packageId,
      packageName: req.body.packageName,
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

// get packageItems
export const getPackageItems = asyncHandler(async (req, res) => {
  try {
    const packageItems = await PackageItem.find({}).sort({
      "deliveryDetails.deliveryDate": -1,
    });

    return res.status(200).json(packageItems);
  } catch (error) {
    console.log("Error getting package items:", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// get packageItems by user
export const getPackageItemsByUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const packageItems = await PackageItem.find({
      customer: user._id,
    }).populate("customer");
    return res.status(200).json(packageItems);
  } catch (error) {
    console.log("Error getting user:", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// search packageItems
export const searchPackageItems = asyncHandler(async (req, res) => {
  try {
    const { tags, status, priority, trackingNumber } = req.query;
    let query = {};

    if (tags) {
      query.packageName = { $in: tags.split(",") };
    }
    if (status) {
      query.currentStatus = status;
    }
    if (priority) {
      query.priority = priority;
    }
    if (trackingNumber) {
      query["deliveryDetails.trackingNumber"] = trackingNumber;
    }

    const packageItems = await PackageItem.find(query).populate("customer");
    return res.status(200).json(packageItems);
  } catch (error) {
    console.log("Error searching package items:", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

// update packageItem
export const updatePackageItem = asyncHandler(async (req, res) => {
  try {
    console.log('PUT request received');
    if (!req.oidc || !req.oidc.user) {
      return res.status(401).json({ message: "Not Authorized" });
    }
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });
    const isAuth = req.oidc.isAuthenticated() || user.email;

    if (!isAuth) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    console.info('User found for the request:', user);

    const { id } = req.params;
    const { deliveryDate, deliveryTime, additionalInstructions } = req.body;

    const packageItem = await PackageItem.findOne({packageId: id});
    if (!packageItem) {
      return res.status(404).json({
        message: "Package item not found",
      });
    }

    console.info(`PackaggeItsm found for the packageId:${id}`);


    if (packageItem.customer.toString() !== user.id.toString()) {
      return res.status(401).json({
        message: "Not authorized to update package item",
      });
    }

    // Update only the allowed fields
    if (deliveryDate) {
      const parsedDeliveryDate = parseISO(deliveryDate);
      if (!isValid(parsedDeliveryDate)) {
        return res.status(400).json({ message: "Invalid delivery date" });
      }
      packageItem.deliveryDetails.deliveryDate = parsedDeliveryDate;
    }

    if (deliveryTime) {
      packageItem.deliveryDetails.deliveryTime = deliveryTime;
    }

    if (additionalInstructions) {
      packageItem.additionalInstructions = additionalInstructions;
    }

    const updatedPackageItem = await packageItem.save();

    return res.status(200).json({
      message: "Package item updated successfully",
      packageItem: updatedPackageItem,
    });
  } catch (error) {
    console.log("Error updating package item:", error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});
