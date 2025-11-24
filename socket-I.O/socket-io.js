import { Server } from "socket.io";
import Message from "../models/Message.js";

export function socketServer(server) {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {

    socket.on("joinActivity", ({ activityId, userId, username }) => {
      const room = `activity_${activityId}`;
      socket.join(room);

      io.to(room).emit("systemMessage", {
        text: `${username} joined the chat`,
        username,
        userId: String(userId),
        timestamp: new Date().toISOString(),
        system: true
      });
    });

    socket.on("sendMessage", async ({ activityId, userId, username, text }) => {
      try {
        const saved = await Message.create({
          activityId,
          userId,
          username,
          text
        });

        const msg = {
          _id: saved._id.toString(),
          activityId: saved.activityId,
          userId: saved.userId.toString(),
          username: saved.username,
          text: saved.text,
          timestamp: saved.createdAt.toISOString()
        };

        io.to(`activity_${activityId}`).emit("receiveMessage", msg);

      } catch (err) {
        console.log("ERROR saving message:", err);
      }
    });

  });
}