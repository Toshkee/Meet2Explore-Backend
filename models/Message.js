import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    activityId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: String,
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);