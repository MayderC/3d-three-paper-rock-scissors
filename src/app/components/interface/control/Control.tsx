import React from "react";
import Option from "./Option";
import "./style.css";
import { Party } from "@/game/logic/Party";
import { ALLOWED_MOVEMENTS } from "@/game/logic/constants/AllowedMovements";

const audio = new Audio("/confirm.wav");

interface ControlProps {
  party: Party;
  setMove: Function;
}

export const Control = ({ party, setMove }: ControlProps) => {
  const doAttemptPaper = () => {
    party.localPlayer?.setNewMovementAttempt(ALLOWED_MOVEMENTS.PAPER);
    audio.play();
    setMove(ALLOWED_MOVEMENTS.PAPER);
  };

  const doAttemptRock = () => {
    party.localPlayer?.setNewMovementAttempt(ALLOWED_MOVEMENTS.ROCK);
    audio.play();
    setMove(ALLOWED_MOVEMENTS.ROCK);
  };

  const doAttemptScissors = () => {
    party.localPlayer?.setNewMovementAttempt(ALLOWED_MOVEMENTS.SCISSORS);
    audio.play();
    setMove(ALLOWED_MOVEMENTS.SCISSORS);
  };

  return (
    <div className="control-container">
      <Option src="rock.jpg" fn={doAttemptRock} />
      <Option src="paper.jpg" fn={doAttemptPaper} />
      <Option src="scissors.jpg" fn={doAttemptScissors} />
    </div>
  );
};
