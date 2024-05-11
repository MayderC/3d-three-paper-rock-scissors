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
  public nextMovementAttempt: MovementAttempt | null = null;
  public movementAttempts: MovementAttempt[] = [];
  public model: Object3D | null = null;

  constructor(id: string, name: string, type: PlayerType = PlayerType.LOCAL) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  public setNewMovementAttempt(movement: ALLOWED_MOVEMENTS): void {
    this.nextMovementAttempt = new MovementAttempt(movement, this);
  }


  public getLatestMovement(): MovementAttempt | null {
    return this.movementAttempts[this.movementAttempts.length - 1] || null;
  }

}
