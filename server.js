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

// Create app + server
const app = express();
const server = http.createServer(app);

// PORT
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://meet-2-explore.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options(/.*/, cors());

// Body parser + logger
app.use(express.json());
app.use(logger("dev"));

// Routes
app.use("/test-jwt", testJwtRouter);
app.use("/api/auth", authRouter);
app.use("/api/trips", tripRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

// Start Socket.io
socketServer(server);

// Start server
server.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});