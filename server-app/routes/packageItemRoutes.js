import express from "express";
import { createPackageItem } from "../controllers/packageItemController.js";

const router = express.Router();

router.post("/packageitem", createPackageItem);

export default router;
