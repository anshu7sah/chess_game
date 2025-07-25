import { Chess, ChessInstance } from "chess.js";
import { Socket } from "socket.io";
import { GAME_OVER, INIT_GAME, MOVE } from "./Types.js";

export class Game {
  public player1: Socket;
  public player2: Socket;
  private board: ChessInstance;
  private startTime: Date;
  private totalMoves = 0;

  constructor(p1: Socket, p2: Socket) {
    this.player1 = p1;
    this.player2 = p2;
    this.board = new Chess();
    this.startTime = new Date();

    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
        },
      })
    );

    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );
  }

  makeMove(socket: Socket, move: string) {
    // validation of the move
    // we will move the pieces and update the board
    // Is the game over or check mate
    // push the board to all the players involved

    if (this.totalMoves % 2 === 0 && socket !== this.player1) {
      return;
    }
    if (this.totalMoves % 2 === 1 && socket !== this.player2) {
      return;
    }

    try {
      this.board.move(move);
    } catch (error: any) {
      console.log("error while making move", error.message);
      return;
    }
    if (this.board.game_over()) {
      // Message will be sent to both the player about who won and who lost
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
      this.player2.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );

      return;
    }
    if (this.totalMoves % 2 === 0) {
      this.player2.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    } else {
      this.player1.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }
    this.totalMoves++;

    // send the updated board to both the player
  }
}
