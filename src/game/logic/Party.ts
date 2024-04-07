import { GameState } from "./GameState";
import { Player } from "./Player";
import { is } from "./../../../node_modules/@babel/types/lib/index-legacy.d";
import { ClockPerRound } from "./ClockPerRound";
import { doAttemptWithStrategies } from "./domain/GameLogic";
import { MovementAttempt } from "./MovementAttempt";

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

  public static getInstance(localPlayer: Player, remotePlayer: Player) {
    if (!Party.instance) {
      Party.instance = new Party(localPlayer, remotePlayer);
    }

    return Party.instance;
  }

  public static getParty() {
    if (!Party.instance) {
      throw new Error("Party not initialized");
    }

    return Party.instance;
  }

  public reset() {
    this.gameState = new GameState();
    this.localPlayer = null;
    this.remotePlayer = null;
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

  public doAttempt() {
    const localMovement = this.localPlayer?.lastMovementAttempt?.name;
    const remoteMovement = this.remotePlayer?.lastMovementAttempt?.name;

    if (!localMovement || !remoteMovement)
      throw new Error("Movements not found");

    if (!this.localPlayer || !this.remotePlayer)
      throw new Error("Players not found");

    doAttemptWithStrategies(
      new MovementAttempt(localMovement, this.localPlayer),
      new MovementAttempt(remoteMovement, this.remotePlayer)
    );

    this.updatePlayerMovements();
  }

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
