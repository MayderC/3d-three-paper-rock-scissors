import { Object3D } from "three";
import { MovementAttempt } from "./MovementAttempt";
import { PlayerState } from "./PlayerState";
import { ALLOWED_MOVEMENTS } from "./constants/AllowedMovements";
import { PlayerType } from "./constants/PlayerType";

export class Player {
  public id: string = "";
  public type: PlayerType;
  public name: string = "";
  public state: PlayerState = new PlayerState();
  public lastMovementAttempt: MovementAttempt | null = null;
  public movementAttempts: MovementAttempt[] = [];
  public model: Object3D | null = null;

  constructor(id: string, name: string, type: PlayerType = PlayerType.LOCAL) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  public setNewMovementAttempt(movement: ALLOWED_MOVEMENTS): void {
    console.log("Setting new movement attempt");
    this.lastMovementAttempt = new MovementAttempt(movement, this);
    console.log(this.lastMovementAttempt);
  }
}
