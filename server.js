import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import logger from "morgan";

import testJwtRouter from "./controllers/test-jwt.js";
import authRouter from "./routes/auth.js";
import tripRouter from "./routes/trips.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB runtime error:", err.message);
});


app.use(cors());
app.use(express.json());
app.use(logger("dev"));


app.use("/test-jwt", testJwtRouter); 
app.use("/auth", authRouter);
app.use("/trips", tripRouter);        

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});