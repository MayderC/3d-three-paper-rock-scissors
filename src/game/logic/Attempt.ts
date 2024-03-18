import { MovementAttempt } from "./MovementAttempt";
import { Player } from "./Player";

export class Attempt {
  public winner: Player | null = null;
  public loser: Player | null = null;
  public tie: boolean = false;

  public localMovement: MovementAttempt | null = null;
  public remoteMovement: MovementAttempt | null = null;

  constructor(localMovement: MovementAttempt, remoteMovement: MovementAttempt) {
    this.localMovement = localMovement;
    this.remoteMovement = remoteMovement;
  }

  public getWinner(): Player | null {
    return this.winner;
  }

  public isTie(): boolean {
    return this.tie;
  }

  public getLoser(): Player | null {
    return this.loser;
  }
}
