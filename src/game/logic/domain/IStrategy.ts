import { ALLOWED_MOVEMENTS } from "../constants/AllowedMovements";

export interface IMovementStrategy {
  beats(movement: ALLOWED_MOVEMENTS): boolean;
}
