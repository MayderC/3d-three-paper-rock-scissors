import { ALLOWED_MOVEMENTS } from "../constants/AllowedMovements";

export const getRandomMovement = (): ALLOWED_MOVEMENTS => {
  const movements = Object.values(ALLOWED_MOVEMENTS);
  const randomIndex = Math.floor(Math.random() * movements.length);
  return movements[randomIndex];
};
