import "./style.css";
import { Party } from "@/game/logic/Party";

interface InterfaceViewProps {
  party: Party;
}

export const InterfaceView = ({ party }: InterfaceViewProps) => {
  return (
    <div className="interface-view">
      <div className="player-container">
        <div className="player-item player-left">
          <h3>You</h3>
        </div>
        <div className="player-item player-right">
          <h3>Opponent</h3>
        </div>
      </div>
    </div>
  );
};
