import sinon from "sinon";
import User from "../../models/UserModel.js";
import PackageItem from "../../models/PackageItemModel.js";

/**
 * Mock authentication middleware
 */
export const mockAuth = (role = "admin") => {
  return {
    oidc: {
      user: { sub: "auth0|123456789" },
      isAuthenticated: () => true,
    },
    user: { role, email: "test@example.com" },
  };
};

export const mockAuthFailure = (role = "admin") => {
  return {
    oidc: {
      user: { sub: "auth0|4353663" },
      isAuthenticated: () => false,
    },
    user: { role, email: "test@example.com" },
  };
};

/**
 * Stub the User model findOne method
 */
export const stubUserFindOne = (role = "admin") => {
  return sinon.stub(User, "findOne").resolves({
    _id: "677c53a2a610e14733d581d3",
    auth0Id: "auth0|123456789",
    role,
    email: "test@example.com",
  });
};

/**
 * Stub the PackageItem model methods
 */
export const stubPackageItemMethods = () => {
  const findStub = sinon.stub().returns({
    sort: sinon.stub().returns([
      {
        _id: "67804adb918b35a7ccbbdc12",
        packageId: "PKG-001",
        packageName: "PKG-PKG-001",
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
        customer: "677c53a2a610e14733d581d3",
      },
    ]),
  });

  return {
    find: sinon.stub(PackageItem, "find").callsFake(() => findStub()), // Ensure `.sort()` can be called
    findById: sinon.stub(PackageItem, "findById").resolves({
      _id: "67804adb918b35a7ccbbdc12",
      packageId: "PKG-001",
      packageName: "PKG-PKG-001",
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
      customer: "677c53a2a610e14733d581d3",
      save: sinon.stub().resolvesThis(), // Mock `.save()` method
    }),
    create: sinon.stub(PackageItem, "create").resolves({
      _id: "67804adb918b35a7ccbbdc12",
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
      customer: "677c53a2a610e14733d581d3",
    }),
  };
};
