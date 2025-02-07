import * as chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import supertest from "supertest";
import { app } from "../server.js"; // Ensure correct import
import PackageItem from "../models/PackageItemModel.js";
import User from "../models/UserModel.js";
import { mockAuth, stubUserFindOne, stubPackageItemMethods } from "./helpers/testHelpers.js";

chai.use(chaiHttp);
const { expect } = chai;
const request = supertest(app);

describe("PackageItem API Tests", function () {
  let userStub, packageStub;
  let mockReq;


  before(() => {
    process.env.TEST_MODE = "true"; // Enable test mode
  });

  beforeEach(() => {
    userStub = stubUserFindOne("admin");
    packageStub = stubPackageItemMethods();
    mockReq = mockAuth("admin");

  });

  afterEach(() => {
    sinon.restore();
  });

  describe("POST /api/v1/packageitems - Create PackageItem", function () {
    it("should create a package item successfully", async function () {
      const res = await request
        .post("/api/v1/packageitems")
        .set("Authorization", "Bearer test-token")
        .send({
          packageName: "Electronics Package",
          priority: "High",
          description: "A package containing electronic items.",
          price: 299.99,
          currentStatus: "In Progress",
          additionalInstructions: "Test Comment",
          deliveryDetails: {
            deliveryDate: "2025-04-12",
            deliveryTime: "15:00",
            assignedDriver: "John Doe",
            trackingNumber: "TRACK123456789",
          },
        });

        console.log("Point 0");
        console.log(res.error);

      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("Package item created successfully");
      expect(res.body.packageItem.packageName).to.equal("Electronics Package");
    });

    it("should return 400 for missing package name", async function () {
      const res = await request
        .post("/api/v1/packageitems")
        .set("Authorization", "Bearer test-token")
        .send({
          description: "A package containing electronic items.",
        });

      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal("Invalid or missing package name");
    });

    it("should return 401 for unauthorized user", async function () {
      userStub.restore();
      userStub = stubUserFindOne("user"); // Mock non-admin user

      const res = await request
        .post("/api/v1/packageitems")
        .set("Authorization", "Bearer test-token")
        .send({
          packageName: "Electronics Package",
        });

      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal("Not authorized to create package item");
    });
  });

  describe("GET /api/v1/packageitems - Fetch all package items", function () {
    it("should return array of package items", async function () {
      const res = await request.get("/api/v1/packageitems");

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array").that.is.not.empty;
    });

    it("should return an empty list when no package items exist", async function () {
      packageStub.find.returns({
        sort: sinon.stub().returns([]),
      });
      const res = await request.get("/api/v1/packageitems");

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array").that.is.empty;
    });
  });

  describe("GET /api/v1/packageitems/:id - Fetch package item by ID", function () {
    it("should return the package item if found", async function () {
      const res = await request.get("/api/v1/packageitems/67804adb918b35a7ccbbdc12");

      expect(res.status).to.equal(200);
      expect(res.body.packageName).to.equal("PKG-PKG-001");
    });

    it("should return 404 when package item is not found", async function () {
      packageStub.findById.resolves(null); // Ensure findById returns null

      const res = await request.get("/api/v1/packageitems/nonexistentID");

      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal("Package item not found");
    });
  });

  describe("PUT /api/v1/packageitems/:id - Update package item", function () {
    const packageItemId = "67804adb918b35a7ccbbdc12"; // Mock PackageItem ID
    mockReq = mockAuth("admin");

    it("should update a package item successfully", async function () {
      const res = await request
        .put(`/api/v1/packageitems/${packageItemId}`)
        .set("Authorization", "Bearer test-token")
        .send({
          deliveryDate: "2025-06-15",
          deliveryTime: "14:30",
          additionalInstructions: "Update test",
        });

        console.log(res.error)
  
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("Package item updated successfully");
      expect(res.body.packageItem.deliveryDetails.deliveryDate).to.equal("2025-06-15");
      expect(res.body.packageItem.deliveryDetails.deliveryTime).to.equal("14:30");
      expect(res.body.packageItem.additionalInstructions).to.equal("Update test");
    });

    it("should return 401 if user is not authorized to update", async function () {
      process.env.TEST_MODE = "false"; // get rid of default authorized mode in tests.
      packageStub.findById.resolves({
        _id: "67804adb918b35a7ccbbdc12",
        customer: "someOtherUserID", 
      });

      const res = await request
        .put("/api/v1/packageitems/67804adb918b35a7ccbbdc12")
        .set("Authorization", "Bearer test-token")
        .send({
          additionalInstructions: "Updated instructions",
        });

      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal("Not authorized");
    });
  });
});
