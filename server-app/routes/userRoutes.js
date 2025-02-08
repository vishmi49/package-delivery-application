import express from "express";
import { getUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/check-auth", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    return res.status(200).json({
      isAuthenticated: true,
      user: req.oidc.user,
    });
  } else {
    return res.status(200).json({
      isAuthenticated: false,
      user: null,
    });
  }
});

router.get("/user/:id", getUserProfile);

router.get("/logout", (req, res) => {
  res.oidc.logout({
    returnTo: process.env.BASE_URL,
  });
});

export default router;