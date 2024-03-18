import { ALLOWED_MOVEMENTS } from "./constants/AllowedMovements";
import { Player } from "./Player";

export class MovementAttempt {
  public name: ALLOWED_MOVEMENTS | null = null;
  public Player: Player | null = null;

  constructor(name: ALLOWED_MOVEMENTS, player: Player) {
    this.name = name;
    this.Player = player;
  }
}
