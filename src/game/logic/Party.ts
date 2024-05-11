import { GameState } from "./GameState";
import { Player } from "./Player";
import { ClockPerRound } from "./ClockPerRound";
import { doAttemptWithStrategies } from "./domain/GameLogic";
import { MovementAttempt } from "./MovementAttempt";
import { getRandomMovement } from "./helper/getRandomMovement";

export class Party {
  public localPlayer: Player | null = null;
  public remotePlayer: Player | null = null;
  public gameState: GameState = new GameState();
  public clock: ClockPerRound = new ClockPerRound(5000);
  public limitOfWins: number = 3;
  public roundWinner: Player | null = null;

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
    return this.whoIsTheWinner();
  }


  public getWinnerPerRound(): Player | null {
    return this.roundWinner;
  }

  public isTie(): boolean {
    return this.gameState.isTie();
  }

  public getLoser(): Player | null {
    return this.gameState.getLoser();
  }


  public setRamdomMovement(Player: Player) {
    const move = getRandomMovement();
    Player.setNewMovementAttempt(move);
  }


  public doAttempt() {

    this.setRamdomMovement(this.remotePlayer!);
    if(!this.localPlayer?.nextMovementAttempt?.name) this.setRamdomMovement(this.localPlayer!);

    const localMovement = this.localPlayer?.nextMovementAttempt?.name;
    const remoteMovement = this.remotePlayer?.nextMovementAttempt?.name;


    if (!localMovement || !remoteMovement)
      throw new Error("Movements not found");
    if (!this.localPlayer || !this.remotePlayer)
      throw new Error("Players not found");

    const result = doAttemptWithStrategies(
      new MovementAttempt(localMovement, this.localPlayer),
      new MovementAttempt(remoteMovement, this.remotePlayer)
    );

    this.processAttemptResult(result);
    this.updatePlayerMovements();
  }

  private processAttemptResult(result: any) {
    if (result.tie) {
      console.log("tie")
      this.roundWinner = null;
      return;
    }
    if (result.winner === this.localPlayer) {
      console.log("local wins")
      this.roundWinner = this.localPlayer;
      this.localPlayer?.state.addWin();
      return
    }
    if (result.winner === this.remotePlayer) {
      console.log("remote wins")
      this.roundWinner = this.remotePlayer;
      this.remotePlayer?.state.addWin();
      return;
    }
  }

  private updatePlayerMovements() {

    this.localPlayer?.movementAttempts.push(
      this.localPlayer.nextMovementAttempt!
    );
    this.remotePlayer?.movementAttempts.push(
      this.remotePlayer.nextMovementAttempt!
    );

    if (!this.localPlayer || !this.remotePlayer) return false;

    this.localPlayer.nextMovementAttempt = null;
    this.remotePlayer.nextMovementAttempt = null;
  }



  public isSomePlayerWinner(): boolean {
    if (!this.localPlayer || !this.remotePlayer) return false;
    return (
      this.localPlayer.state.winsCount === this.limitOfWins ||
      this.remotePlayer.state.winsCount === this.limitOfWins
    );
  }

  private whoIsTheWinner(): Player | null {
    if (!this.localPlayer || !this.remotePlayer) return null;
    if (this.localPlayer.state.winsCount === this.limitOfWins) {
      return this.localPlayer;
    }
    if (this.remotePlayer.state.winsCount === this.limitOfWins) {
      return this.remotePlayer;
    }
    return null;
  }

}
