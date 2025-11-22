import express from "express";
import {
  createTrip,
  updateTrip,
  deleteTrip,
  getMyTrips,
  joinTrip,
  leaveTrip,
  getTripsByCity,
} from "../controllers/tripController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTrip);
router.post("/:id/join", protect, joinTrip);
router.post("/:id/leave", protect, leaveTrip);
router.get("/city/:cityId", getTripsByCity);
router.get("/my", protect, getMyTrips);
router.put("/:id", protect, updateTrip);
router.delete("/:id", protect, deleteTrip);

export default router;