import { use, useEffect, useState } from "react";
import "./style.css";
import { Party } from "@/game/logic/Party";

interface InterfaceViewProps {
  party: Party;
  move: string;
}

export const InterfaceView = ({ party, move }: InterfaceViewProps) => {
  return (
    <div className="interface-view">
      <div className="player-container">
        <div className="player-item player-left">
          <h3>You</h3>
          <p>{move}</p>
        </div>
        <div className="player-item player-right">
          <h3>Opponent</h3>
        </div>
      </div>
    </div>
  );
};
