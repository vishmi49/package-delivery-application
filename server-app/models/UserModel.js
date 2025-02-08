import { auth } from "express-openid-connect";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
    },

    auth0Id: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["customer", "admin", "driver"],
      default: "customer",
    },

    OrderedPackages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
      },
    ],

    Address: {
      type: String,
      required: true,
    },

    Phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
