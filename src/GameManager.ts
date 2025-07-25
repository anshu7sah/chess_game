import { Socket } from "socket.io";
import { Game } from "./Game.js";
import { INIT_GAME, MOVE } from "./Types.js";

export class GameManager {
  public games: Game[];
  private pendingUser: Socket | null;
  private users: Socket[];

  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  addUser(socket: Socket) {
    this.users.push(socket);
    this.handleMessage(socket);
    // checking of pending user and start the game if the pending user exist and if not then pendingUser becomes this user
  }

  removeUser(socket: Socket) {
    this.users = this.users.filter((u) => u !== socket);
    // Stop the game
  }

  private handleMessage(socket: Socket) {
    socket.on("message", (d) => {
      const message = JSON.parse(d);
      console.log(message);
      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
        }
      }

      if (message.type === MOVE) {
        const game = this.games.find(
          (g) => g.player1 === socket || g.player2 === socket
        );
        if (game) {
          game.makeMove(socket, message.move);
        }
      }
    });
  }
}
