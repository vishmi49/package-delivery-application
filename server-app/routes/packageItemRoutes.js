import express from "express";
import { createPackageItem, getPackageItems, getPackageItemsByUser, searchPackageItems, updatePackageItem } from "../controllers/packageItemController.js";
import  protect  from "../middleware/protect.js";

const router = express.Router();

// post requests
router.post("/packageitems", protect, createPackageItem);

// get requests
router.get("/packageitems", getPackageItems);
router.get("/packageitems/user/:id", getPackageItemsByUser);
router.get("/packageitems/search", searchPackageItems);

// put requests
router.put("/packageitems/:id", protect, updatePackageItem);

export default router;
