import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { createPackageItem, getPackageItems, getPackageItemById, getPackageItemsByUser, searchPackageItems, updatePackageItem } from "./packageItemController.js";
import PackageItem from "../models/PackageItemModel.js";
import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";

jest.mock("../models/PackageItemModel.js");
jest.mock("../models/UserModel.js");

const app = express();
app.use(express.json());
app.post("/api/package-items", asyncHandler(createPackageItem));
app.get("/api/package-items", asyncHandler(getPackageItems));
app.get("/api/package-items/:id", asyncHandler(getPackageItemById));
app.get("/api/package-items/user/:id", asyncHandler(getPackageItemsByUser));
app.get("/api/package-items/search", asyncHandler(searchPackageItems));
app.put("/api/package-items/:id", asyncHandler(updatePackageItem));

describe("Package Item Controller", () => {
  before(() => {
    process.env.TEST_MODE = "true"; // Enable test mode
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  after(() => {
    process.env.TEST_MODE = "false"; // Enable test mode
  });

  describe("POST /api/package-items", () => {
    it("should create a package item successfully", async () => {
      const mockUser = { _id: "user123", role: "admin", email: "test@example.com" };
      const mockPackageItem = { _id: "pkg123", packageName: "Test Package" };
      
      User.findOne.mockResolvedValue(mockUser);
      PackageItem.create.mockResolvedValue(mockPackageItem);
      
      const response = await request(app)
        .post("/api/package-items")
        .send({ packageName: "Test Package", priority: "High", price: 100, currentStatus: "In Progress", additionalInstructions: "Handle with care", deliveryDetails: { deliveryDate: "2025-01-01T00:00:00Z", deliveryTime: "12:00 PM", assignedDriver: "Driver123", trackingNumber: "TRACK123" } });
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Package item created successfully");
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app).post("/api/package-items").send({});
      expect(response.status).toBe(400);
    });

    it("should return 401 if user is not authenticated", async () => {
      User.findOne.mockResolvedValue(null);
      const response = await request(app).post("/api/package-items").send({ packageName: "Test Package" });
      expect(response.status).toBe(401);
    });
  });
  
  describe("GET /api/package-items", () => {
    it("should return all package items", async () => {
      const mockPackageItems = [{ _id: "pkg123", packageName: "Test Package", priority: "High" }];
      PackageItem.find.mockResolvedValue(mockPackageItems);

      const response = await request(app).get("/api/package-items");
      expect(response.status).toBe(200);
    });
  });

  describe("GET /api/package-items/:id", () => {
    it("should return package item by ID", async () => {
      const mockPackageItem = { _id: "pkg123", packageName: "Test Package", priority: "High" };
      PackageItem.findById.mockResolvedValue(mockPackageItem);

      const response = await request(app).get("/api/package-items/pkg123");
      expect(response.status).toBe(200);
    });

    it("should return 404 if package item is not found", async () => {
      PackageItem.findById.mockResolvedValue(null);
      const response = await request(app).get("/api/package-items/pkg123");
      expect(response.status).toBe(404);
    });
  });

  describe("PUT /api/package-items/:id", () => {
    it("should update package item successfully", async () => {
      const mockUser = { _id: "user123", role: "admin", email: "test@example.com" };
      const mockPackageItem = { _id: "pkg123", packageName: "Test Package", deliveryDetails: { deliveryDate: "2025-01-01T00:00:00Z" } };
      
      User.findOne.mockResolvedValue(mockUser);
      PackageItem.findById.mockResolvedValue(mockPackageItem);
      mockPackageItem.save = jest.fn().mockResolvedValue(mockPackageItem);

      const response = await request(app).put("/api/package-items/pkg123").send({ deliveryDate: "2025-02-01T00:00:00Z" });
      expect(response.status).toBe(200);
    });

    it("should return 401 if user is not authorized to update", async () => {
      User.findOne.mockResolvedValue(null);
      const response = await request(app).put("/api/package-items/pkg123").send({ deliveryDate: "2025-02-01T00:00:00Z" });
      expect(response.status).toBe(401);
    });
  });
});