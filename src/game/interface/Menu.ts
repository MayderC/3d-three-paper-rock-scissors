import { Party } from "../logic/Party";
import { Player } from "../logic/Player";
import { loadPlayers } from "./LoadPlayers";

export class Menu {
  public static instance: Menu | null = null;

  private constructor() {}

  public static getInstance() {
    if (!Menu.instance) {
      Menu.instance = new Menu();
    }

    return Menu.instance;
  }

  public init() {
    console.log("init");
  }

  public async start() {
    const p1 = new Player("1", "Player 1");
    const p2 = new Player("2", "Player 2");

    console.log("start");

    const party = Party.getParty(p1, p2);

    loadPlayers(party);
  }

  public end() {
    console.log("end");
  }

  public pause() {
    console.log("pause");
  }
}
