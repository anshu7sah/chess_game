import { Chess, type Color, type PieceSymbol, type Square } from "chess.js";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

type ChessBoardType = ({
  square: Square;
  type: PieceSymbol;
  color: Color;
} | null)[][];

export const useSocket = () => {
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState<ChessBoardType>([]);
  const socket = io("http://localhost:5000/socket");

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("message", (data: any) => {
      const message = JSON.parse(data);
      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          break;
        case GAME_OVER:
          console.log("Game OVer");
          break;
      }
    });
  }, [socket]);

  return [socket, board];
};

// import { useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// export const useSocket = () => {
//   const socketRef = useRef(null);

//   useEffect(() => {
//     const socket = io("http://localhost:5000", {
//       path: "/socket",
//     });

//     socketRef.current = socket;

//     socket.on("connect", () => {
//       console.log("Connected to socket server");
//     });

//     socket.on("disconnect", () => {
//       console.log("disconnectedd from the socket server");
//     });

//     socket.on("anshu", (data) => {
//       console.log(data);
//     });

//     socket.on("ranjan", (data) => {
//       console.log(data);
//     });
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return socketRef;
// };
