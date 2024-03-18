import { MovementAttempt } from "./MovementAttempt";
import { PlayerState } from "./PlayerState";
import { ALLOWED_MOVEMENTS } from "./constants/AllowedMovements";

export class Player {
  public id: string = "";
  public name: string = "";
  public state: PlayerState = new PlayerState();
  public lastMovementAttempt: MovementAttempt | null = null;
  public movementAttempts: MovementAttempt[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  public setNewMovementAttempt(movement: ALLOWED_MOVEMENTS): void {
    this.lastMovementAttempt = new MovementAttempt(movement, this);
  }
}
