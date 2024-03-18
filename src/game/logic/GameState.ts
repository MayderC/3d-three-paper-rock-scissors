import { Player } from "./Player";

export class GameState {
  public winner: Player | null = null;
  public loser: Player | null = null;
  public tie: boolean = false;

  constructor() {}

  public getWinner(): Player | null {
    return this.winner;
  }

  public isTie(): boolean {
    return this.tie;
  }

  public getLoser(): Player | null {
    return this.loser;
  }

  public setWinner(player: Player): void {
    this.winner = player;
  }

  public setLoser(player: Player): void {
    this.loser = player;
  }

  public reset(): void {
    this.winner = null;
    this.loser = null;
  }
}
