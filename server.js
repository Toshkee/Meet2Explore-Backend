import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import logger from "morgan";
import http from "http";

// Routers
import testJwtRouter from "./controllers/test-jwt.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import tripRouter from "./routes/trips.js";
import messageRouter from "./routes/messages.js";

// Socket.io
import { socketServer } from "./socket-I.O/socket-io.js";

// Create express app FIRST
const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Register routes AFTER app is created
app.use("/test-jwt", testJwtRouter);
app.use("/api/auth", authRouter);
app.use("/api/trips", tripRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);  

// Start Socket.io server
socketServer(server);

// // Start HTTP server
// server.listen(port, () => {
//   console.log(`The express app is ready on port ${port}!`);
// });