import { GameState } from "./GameState";
import { Player } from "./Player";
import { is } from "./../../../node_modules/@babel/types/lib/index-legacy.d";
import { ClockPerRound } from "./ClockPerRound";

export class Party {
  public localPlayer: Player | null = null;
  public remotePlayer: Player | null = null;
  public gameState: GameState = new GameState();
  public clock: ClockPerRound = new ClockPerRound(4000);
  public numberOfWins: number = 3;

  public static instance: Party | null = null;

  private constructor(localPlayer: Player, remotePlayer: Player) {
    this.localPlayer = localPlayer;
    this.remotePlayer = remotePlayer;
  }

  public static getParty(localPlayer: Player, remotePlayer: Player) {
    if (!Party.instance) {
      Party.instance = new Party(localPlayer, remotePlayer);
    }

    return Party.instance;
  }

  public getWinner(): Player | null {
    return this.gameState.getWinner();
  }

  public isTie(): boolean {
    return this.gameState.isTie();
  }

  public getLoser(): Player | null {
    return this.gameState.getLoser();
  }

  public doAttempt() {}

  private updatePlayerMovements() {
    this.localPlayer?.movementAttempts.push(
      this.localPlayer.lastMovementAttempt!
    );
    this.remotePlayer?.movementAttempts.push(
      this.remotePlayer.lastMovementAttempt!
    );
  }

  private isRoundOver(): boolean {
    return false;
  }

  private isSomePlayerWinner(): boolean {
    if (!this.localPlayer || !this.remotePlayer) return false;
    return (
      this.localPlayer.state.wins === this.numberOfWins ||
      this.remotePlayer.state.wins === this.numberOfWins
    );
  }
}
