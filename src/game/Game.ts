import { attemptAnimation } from "./interface/Animations";
import { loadPlayers } from "./interface/LoadPlayers";
import { ANIMATION_NAMES } from "./logic/constants/AllowedMovements";
import { PlayerType } from "./logic/constants/PlayerType";
import { Player } from "./logic/Player";
import { Party } from "@/game/logic/Party";

export enum callbackType {
  FINISH,
  BETWEEN,
}


export class Game {

  private secondsHandler: Function;
  private callbackMap: Map<callbackType, Function> = new Map(
    [
      [callbackType.FINISH, this.finishRound],
      [callbackType.BETWEEN, this.betweenRounds]
    ]
  );

  constructor() {
    this.secondsHandler = () => { };
    this.loadGame();
  }

  public setStateSecondsHandler(handler: Function) {
    this.secondsHandler = handler;
  }

  public loadGame() {
    const p1 = new Player("1", "Player 1");
    const p2 = new Player("2", "Player 2", PlayerType.REMOTE);
    const party = Party.getInstance(p1, p2);
    loadPlayers(party);
  }

  private finishRound() {
    Party.getParty().doAttempt();
    console.log("Round finished");
  }

  private betweenRounds() {
    if(Party.getParty().isSomePlayerWinner()){
      console.log("Game finished");
    }
  }


  private initClockParty() {

    const party = Party.getParty();
    if (!party.localPlayer?.model || !party.remotePlayer?.model) return;
    if(!this.secondsHandler) return;

    const callback = (cb: callbackType ) => {
      const fn = this.callbackMap.get(cb);
      if(fn) fn();
    }

    const callbackSeconds = (time: number) => {
      this.secondsHandler(time);
    }

    party.clock.clockTick(callback, callbackSeconds)

  }

  public start() {

    const party = Party.getParty();
    if (!party.localPlayer?.model || !party.remotePlayer?.model) return;
    attemptAnimation(party?.localPlayer?.model, ANIMATION_NAMES.HELLO, 0);
    attemptAnimation(party?.remotePlayer?.model, ANIMATION_NAMES.HELLO, 250, () => {

      this.initClockParty();

    })
  }


  public end() {
    console.log("Game ended");
  }
}
