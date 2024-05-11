import { Menu } from "@/game/interface/Menu";
import { MainMenu } from "./menu/MainMenu";
import "./style.css";
import { Party } from "@/game/logic/Party";
import { useEffect, useRef } from "react";
import { attemptAnimation } from "@/game/interface/Animations";

interface InterfaceViewProps {
  party: Party;
  move: string;
  menu: Menu,
  seconds: number
  setMove: Function
}

export const InterfaceView = ({ party, move, menu, seconds, setMove }: InterfaceViewProps) => {

  const secondsRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const chooseMovementListener = () => {
      secondsRef.current?.classList.remove("hidden")
      console.log("Choose movement Event")
    }

    const endGameListener = () => {
      console.log(Party.getParty().getWinner())
      console.log("Game End Event")
    }

    const winnerPerRoundListener = () => {
      secondsRef.current?.classList.add("hidden")
      setMove("")

      console.log("Winner Per Round Event",)
      console.log("***********")
      console.log("local")
      console.log(Party.getParty().localPlayer?.getLatestMovement(), Party.getParty().localPlayer?.id)
      console.log("remote")
      console.log(Party.getParty().remotePlayer?.getLatestMovement(), Party.getParty().remotePlayer?.id)
      console.log("***********")

      const lMove = Party.getParty().localPlayer?.getLatestMovement()?.name
      const rMove = Party.getParty().remotePlayer?.getLatestMovement()?.name

      if (lMove && rMove){
        attemptAnimation(Party.getParty().localPlayer?.model!, lMove)
        attemptAnimation(Party.getParty().remotePlayer?.model!, rMove)
      }





      console.log(Party.getParty().getWinnerPerRound())
      console.log("Winner Per Round Event")
    }

    document.addEventListener("chooseMovement", chooseMovementListener)
    document.addEventListener("endGame", endGameListener)
    document.addEventListener("winnerPerRound", winnerPerRoundListener)

    return () => {
      document.removeEventListener("chooseMovement", chooseMovementListener)
      document.removeEventListener("endGame", endGameListener)
      document.removeEventListener("winnerPerRound", winnerPerRoundListener)
    }
  }, [])


  return (
    <div className="interface-view">
      <div className="player-container">
        <div className="player-item player-left">
          <h3>You</h3>
          {(party?.localPlayer?.state?.winsCount ?? 0) >= 0 && <p className="wins">Wins: {party?.localPlayer?.state.winsCount}</p>}
          <p className="opp-move">
            {move || party?.localPlayer?.getLatestMovement()?.name}
          </p>
        </div>
        <div ref={secondsRef} className="hidden seconds">
          <p>
            Elije tu movimiento
          </p>
          <p>
            {
              seconds / 1000
            }
          </p>
        </div>
        <div className="player-item player-right">
          <h3>Opponent</h3>
          {(party?.remotePlayer?.state?.winsCount ?? 0) >= 0 && <p className="wins">Wins: {party?.remotePlayer?.state.winsCount}</p>}
          <p className="opp-move">
            {party?.remotePlayer?.getLatestMovement()?.name}
          </p>
        </div>
      </div>
      <MainMenu menu={menu} party={party} />
    </div>
  );
};
