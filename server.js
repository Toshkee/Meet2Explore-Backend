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
});

app.use(cors())
app.use(express.json())
app.use(logger("dev"));

app.use("/test-jwt", testJwtRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
socketServer(server);

server.listen(3000, () => {
  console.log('listening on *:3000');
});