export class ClockPerRound {
  public roundTime: number;

  constructor(roundTime: number) {
    this.roundTime = roundTime;
  }

  public clockTick(callback: Function, tick: Function): void {
    let time = this.roundTime;
    const interval = setInterval(() => {
      time -= 1000;
      tick(time);
      if (time === 0) {
        callback();
        clearInterval(interval);
      }
    }, 1000);
  }
}
