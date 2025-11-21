import express from "express";
import {
  createTrip,
  updateTrip,
  deleteTrip,
  getMyTrips,
} from "../controllers/tripController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTrip); 
router.put("/:id", protect, updateTrip);
router.delete("/:id", protect, deleteTrip);
router.get("/my", protect, getMyTrips);

export default router;