import express from "express";

import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { GameManager } from "./GameManager.js";
import { Game } from "./Game.js";

const app = express();

app.use(
  cors({
    origin: function (origin, cb) {
      cb(null, true);
    },
    credentials: true,
  })
);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: "/socket",
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const gameManager = new GameManager();

io.on("connection", (socket) => {
  gameManager.addUser(socket);

  socket.on("disconnect", () => {
    gameManager.removeUser(socket);
  });
});

httpServer.listen(5000, () => {
  console.log("listening on port 5000");
});
