import React from "react";
import Option from "./Option";
import "./style.css";
import { Party } from "@/game/logic/Party";
import { ALLOWED_MOVEMENTS } from "@/game/logic/constants/AllowedMovements";

interface ControlProps {
  party: Party;
}

export const Control = ({ party }: ControlProps) => {
  const doAttemptPaper = () =>
    party.localPlayer?.setNewMovementAttempt(ALLOWED_MOVEMENTS.PAPER);

  const doAttemptRock = () =>
    party.localPlayer?.setNewMovementAttempt(ALLOWED_MOVEMENTS.ROCK);

  const doAttemptScissors = () =>
    party.localPlayer?.setNewMovementAttempt(ALLOWED_MOVEMENTS.SCISSORS);

  return (
    <div className="control-container">
      <Option fn={doAttemptRock} />
      <Option fn={doAttemptPaper} />
      <Option fn={doAttemptScissors} />
    </div>
  );
};
