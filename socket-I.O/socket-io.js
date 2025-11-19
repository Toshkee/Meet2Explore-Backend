import { Server } from "socket.io"
let onlineUsers = {};
function socketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("addUser", (userId) => {
        onlineUsers[userId] = socket.id;
        io.emit("onlineUsers", onlineUsers);
      });

    socket.on("typing", () => {
        socket.broadcast.emit("typing", socket.id);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const receiverSocketId = onlineUsers[receiverId];
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("getMessage", {
            senderId,
            text,
          });
        }
      });

      socket.on("disconnect", () => {
        Object.keys(onlineUsers).forEach((userId) => {
          if (onlineUsers[userId] === socket.id) {
            delete onlineUsers[userId];
          }
        });
        io.emit("onlineUsers", onlineUsers);
        console.log("User disconnected");
      });
    });
  }
module.exports = socketServer;
  
