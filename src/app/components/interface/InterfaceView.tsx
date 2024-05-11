import { Menu } from "@/game/interface/Menu";
import { MainMenu } from "./menu/MainMenu";
import "./style.css";
import { Party } from "@/game/logic/Party";
import { useEffect, useRef } from "react";
import { attemptAnimation } from "@/game/interface/Animations";
import { ANIMATION_NAMES } from "@/game/logic/constants/AllowedMovements";
import { EndMenu } from "./menu/EndMenu";

interface InterfaceViewProps {
  party: Party;
  move: string;
  menu: Menu,
  seconds: number
  setMove: Function
}

export const InterfaceView = ({ party, move, menu, seconds, setMove }: InterfaceViewProps) => {

  const secondsRef = useRef<HTMLDivElement>(null)
  const winnerRoundRef = useRef<HTMLDivElement>(null)
  const winnerGameRef = useRef<HTMLDivElement>(null)
  const endMenuRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const chooseMovementListener = () => {
      secondsRef.current?.classList.remove("hidden")
      console.log("Choose movement Event")
    }

    const endGameListener = () => {
      console.log("End Game Event")
      winnerGameRef.current?.classList.remove("hidden")
      attemptAnimation(Party.getParty().getWinner()?.model!, ANIMATION_NAMES.HELLO, 0, () => {
        winnerGameRef.current?.classList.add("hidden")
        endMenuRef.current?.classList.remove("hidden")
      })

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

      winnerRoundRef.current?.classList.remove("hidden")

      if (lMove && rMove){
        attemptAnimation(Party.getParty().localPlayer?.model!, lMove)
        attemptAnimation(Party.getParty().remotePlayer?.model!, rMove, 0, () => {
          winnerRoundRef.current?.classList.add("hidden")
        })
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
          <p>Choose your movement</p>
          <p>{seconds / 1000}</p>
        </div>
        <div ref={winnerRoundRef} className="hidden winner-round hover">
          <p>Round Winner</p>
          {party?.getWinnerPerRound()?.id === party?.localPlayer?.id && <p>You Win</p>}
          {party?.getWinnerPerRound()?.id === party?.remotePlayer?.id && <p>You Lose</p>}
          {!party?.getWinnerPerRound()?.id && <p>Tie</p>}
        </div>
        <div ref={winnerGameRef} className="hidden winner-game hover">
          <p>Game Winner</p>
          {party?.getWinner()?.id === party?.localPlayer?.id ? <p>You Win</p> : <p>You Lose</p>}
        </div>
        <div ref={endMenuRef} className="hidden hover">
          <EndMenu />
        </div>
        <div className="player-item player-right">
          <h3>Opponent</h3>
          {(party?.remotePlayer?.state?.winsCount ?? 0) >= 0 && <p className="wins">Wins: {party?.remotePlayer?.state.winsCount}</p>}
        </div>
      </div>
      <MainMenu menu={menu} party={party} />
    </div>
  );
};
