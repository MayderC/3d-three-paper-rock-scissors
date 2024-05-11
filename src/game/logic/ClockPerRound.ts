import { callbackType } from "../Game";
import { Party } from "./Party";

export class ClockPerRound {
  public roundTime: number;
  public readonly timeBetweenRounds: number = 3000;
  public isbetweenRounds: boolean = false;
  private readonly step: number = 1000;
  private readonly finalTime: number = 0;
  public cont = 0;
  public event = new Event("chooseMovement");
  public winnerEvent = new Event("winnerPerRound");
  public endGameEvent = new Event("endGame");


  constructor(roundTime: number) {
    this.roundTime = roundTime;
}

  public clockBewteenRounds(callback: Function, tick: Function): void {
    let time = this.timeBetweenRounds;
    document.dispatchEvent(this.winnerEvent);
    callback(callbackType.BETWEEN);
    const interval = setInterval(() => {
      time -= this.step;
      if (time === this.finalTime) {
        this.clockTick(callback, tick);
        clearInterval(interval);
      }
    }, this.step);
  }

  public clockTick(callback: Function, tick: Function): void {
    this.cont++;

    if(Party.getParty().isSomePlayerWinner()){
      document.dispatchEvent(this.endGameEvent);
      return;
    }

    document.dispatchEvent(this.event);
    let time = this.roundTime;
    tick(time);
    const interval = setInterval(() => {
      time -= this.step;
      tick(time);
      if (time === this.finalTime) {
        tick(time);
        callback(callbackType.FINISH);
        this.clockBewteenRounds(callback, tick);
        clearInterval(interval);
      }
    }, this.step);
  }
}
