import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: String, required: true },
    travelStyle: { type: String, required: true },
    maxGroupSize: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);