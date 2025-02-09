import request from "supertest";
import express from "express";
import { getUserProfile } from "./userController.js";
import User from "../models/UserModel.js";
import asynHandler from "express-async-handler";

jest.mock("../models/UserModel.js");

const app = express();
app.use(express.json());
app.get("/api/users/:id", asynHandler(getUserProfile));

describe("GET /api/users/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and user data if user is found", async () => {
    const mockUser = { auth0Id: "123", name: "John Doe", email: "john@example.com" };
    User.findOne.mockResolvedValue(mockUser);

    const response = await request(app).get("/api/users/123");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
    expect(User.findOne).toHaveBeenCalledWith({ auth0Id: "123" });
  });

  it("should return 404 if user is not found", async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app).get("/api/users/123");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "User not found" });
  });

  it("should return 500 if there is a server error", async () => {
    User.findOne.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/api/users/123");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Internal Server Error" });
  });
});
