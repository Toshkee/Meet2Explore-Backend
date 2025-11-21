// server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import logger from "morgan";
import http from "http";

import testJwtRouter from "./controllers/test-jwt.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";   // <── OVO
import tripRouter from "./routes/trips.js";

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use("/test-jwt", testJwtRouter);
app.use("/api/auth", authRouter);
app.use("/api/trips", tripRouter);
app.use("/api/users", userRouter);

server.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
