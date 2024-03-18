import { MovementAttempt } from "../MovementAttempt";
import { Player } from "../Player";
import { ALLOWED_MOVEMENTS } from "../constants/AllowedMovements";
import { PaperStrategy, RockStrategy, ScissorsStrategy } from "./Strategies";

export interface AttemptResult {
  winner: Player | null;
  loser: Player | null;
  tie: boolean;
}

const mapStrategies = {
  [ALLOWED_MOVEMENTS.PAPER]: new PaperStrategy(),
  [ALLOWED_MOVEMENTS.ROCK]: new RockStrategy(),
  [ALLOWED_MOVEMENTS.SCISSORS]: new ScissorsStrategy(),
};

export const doAttemptWithStrategies = (
  local: MovementAttempt,
  remote: MovementAttempt
): AttemptResult => {
  if (local.name === null || remote.name === null) {
    return {
      winner: null,
      loser: null,
      tie: true,
    };
  }

  const localStrategy = mapStrategies[local.name];
  const remoteStrategy = mapStrategies[remote.name];

  if (localStrategy.beats(remote.name)) {
    return {
      winner: local.Player,
      loser: remote.Player,
      tie: false,
    };
  }

  if (remoteStrategy.beats(local.name)) {
    return {
      winner: remote.Player,
      loser: local.Player,
      tie: false,
    };
  }

  return {
    winner: null,
    loser: null,
    tie: true,
  };
};
