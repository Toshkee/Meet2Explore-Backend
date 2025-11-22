import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

router.get("/:activityId", async (req, res) => {
  const messages = await Message.find({ activityId: req.params.activityId })
    .sort({ createdAt: 1 })
    .lean();

  const formatted = messages.map((m) => ({
    ...m,
    userId: m.userId?.toString() || null
  }));

  res.json(formatted);
});

export default router;