import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    fullname: { type: String, default: "" },
    bio: { type: String, default: "" },

    gender: { type: String, enum: ["male", "female", "other"], default: "other" },

    avatar: { type: String, default: "" }, // URL slike
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
