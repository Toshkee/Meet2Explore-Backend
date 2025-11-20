import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import logger from "morgan"
import http from "http"

import testJwtRouter from "./controllers/test-jwt.js"
import authRouter from "./routes/auth.js"
import userRouter from "./controllers/users.js"
<<<<<<< HEAD
import tripRouter from "./routes/trips.js"
=======
>>>>>>> 5221fb255c2bc27b763063ca3e09fbc18970b8a0
// import { socketServer } from "./socket-I.O/socket.io.js"
const app = express();
const server = http.createServer(app)

const port = 3000 || process.env.PORT

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
app.use("/trips", tripRouter);   
app.use("/users", userRouter); 

  // socketServer(server);

server.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});



