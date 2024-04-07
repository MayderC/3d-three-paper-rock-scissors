import { loadPlayers } from "./interface/LoadPlayers";
import { Player } from "./logic/Player";
import { Party } from "@/game/logic/Party";

export class Game {
  public start() {
    const p1 = new Player("1", "Player 1");
    const p2 = new Player("2", "Player 2");
    const party = Party.getInstance(p1, p2);
    loadPlayers(party);
  }

  public end() {
    console.log("Game ended");
  }
}
