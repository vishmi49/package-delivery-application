import express from "express";
import { createPackageItem, getPackageItems, getPackageItemsByUser, searchPackageItems, updatePackageItem, getPackageItemById } from "../controllers/packageItemController.js";
import  protect  from "../middleware/protect.js";

const router = express.Router();

// post requests
router.post("/packageitems", createPackageItem);

// get requests
router.get("/packageitems", getPackageItems);
router.get("/packageitems/:id", getPackageItemById);
router.get("/packageitems/user/:email", getPackageItemsByUser);
router.get("/packageitems/search", searchPackageItems);

// put requests
router.put("/packageitems/:id", protect, updatePackageItem);

export default router;
