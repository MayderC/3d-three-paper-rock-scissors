import { Game } from "../Game";

export class Menu {
  public static instance: Menu | null = null;
  private game: Game;

  private constructor() {
    this.game = new Game();
  }

  public static getInstance() {
    if (!Menu.instance) Menu.instance = new Menu();
    return Menu.instance;
  }

  public start() {
    this.game.start();
  }

  public end() {
    console.log("end");
  }

  public pause() {
    console.log("pause");
  }
}
