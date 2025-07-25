import { Socket } from "socket.io";
import { Game } from "./Game";

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
      if (message.type === "init_game") {
      }
    });
  }
}
