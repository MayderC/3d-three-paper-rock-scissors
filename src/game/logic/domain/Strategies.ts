import { ALLOWED_MOVEMENTS } from "../constants/AllowedMovements";
import { IMovementStrategy } from "./IStrategy";

export class PaperStrategy implements IMovementStrategy {
  public beats(movement: string): boolean {
    return movement === ALLOWED_MOVEMENTS.ROCK;
  }
}

export class RockStrategy implements IMovementStrategy {
  public beats(movement: string): boolean {
    return movement === ALLOWED_MOVEMENTS.SCISSORS;
  }
}

export class ScissorsStrategy implements IMovementStrategy {
  public beats(movement: string): boolean {
    return movement === ALLOWED_MOVEMENTS.PAPER;
  }
}
