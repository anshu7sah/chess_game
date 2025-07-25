import { Chess, ChessInstance } from "chess.js";
import { Socket } from "socket.io";

export class Game {
  public player1: Socket;
  public player2: Socket;
  private board: ChessInstance;

  private startTime: Date;

  constructor(p1: Socket, p2: Socket) {
    this.player1 = p1;
    this.player2 = p2;
    this.board = new Chess();
    this.startTime = new Date();
  }

  makeMove(socket: Socket, move: string) {
    // validation of the move
    // we will move the pieces and update the board
    // Is the game over or check mate
    // push the board to all the players involved
  }
}
