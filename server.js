<<<<<<< HEAD
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
=======
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import logger from "morgan"
import http from "http"

import testJwtRouter from "./controllers/test-jwt.js"
import authRouter from "./controllers/auth.js"
import userRouter from "./controllers/users.js"
import { socketServer } from "./socket-I.O/socket.io.js"
const app = express();
const server = http.createServer(app)

const port = 3000 || process.env.PORT

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
>>>>>>> 9dfdc039f17bdca3af1a25aa8bc20c8351c4b5c6
});


app.use(cors());
app.use(express.json());
app.use(logger("dev"));


app.use("/test-jwt", testJwtRouter); 
app.use("/auth", authRouter);
<<<<<<< HEAD
app.use("/trips", tripRouter);        

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
=======
app.use("/users", userRouter);
socketServer(server);

server.listen(3000, () => {
  console.log('listening on *:3000');
>>>>>>> 9dfdc039f17bdca3af1a25aa8bc20c8351c4b5c6
});