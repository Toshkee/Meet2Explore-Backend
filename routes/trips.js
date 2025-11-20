import express from "express";
import { 
  createTrip, 
  updateTrip, 
  deleteTrip, 
  getTrips, 
  getTripById 
} from "../controllers/tripController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createTrip);
router.put("/:id", updateTrip);
router.delete("/:id", deleteTrip);
router.get("/", getTrips);
router.get("/:id", getTripById);

export default router;