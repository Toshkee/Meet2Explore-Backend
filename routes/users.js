// routes/users.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMyProfile, updateMyProfile } from "../controllers/userController.js";
import { upload } from "../middleware/upload.js";
import User from "../models/userModel.js"; 

const router = express.Router();

router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateMyProfile);
router.post("/avatar", protect, upload.single("image"), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.avatar = req.file.path; 
    await user.save();

    res.json({
      success: true,
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
