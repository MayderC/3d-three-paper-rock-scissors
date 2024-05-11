export class PlayerState {
  private wins: number = 0;
  private losses: number = 0;

  public get lossesCount() {
    return this.losses;
  }

  public get winsCount() {
    return this.wins;
  }

  public addWin() {
    this.wins++;
  }

}
