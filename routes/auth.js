import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/sign-up", registerUser);
router.post("/sign-in", loginUser);
router.get("/me", protect, getMe);
router.post("/sign-out", (req, res) => {
  res.json({ message: "Signed out successfully" });
});

export default router;