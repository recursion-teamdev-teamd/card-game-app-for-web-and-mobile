import { gameInfoWar } from "./../gameInfo/gameInfo";
import { Deck } from "./../deck/deck";
import { Card } from "@/models/card/card";
import { GameInfo } from "@/models/gameInfo/gameInfo";
import { VanilaTable } from "./abstractTable";
import { WarPlayer } from "../player/warPlayer";
export class WarTable extends VanilaTable {
  protected _deck: Deck = new Deck(gameInfoWar);
  protected _gameResult: "Win" | "Lose" | "Draw" | "YetDecided" = "YetDecided";
  protected _gamePhase: string = "";
  protected _players: WarPlayer[];
  readonly _gameInfo: GameInfo = gameInfoWar;
  public stock: Card[] = [];
  protected _cpu: WarPlayer;
  protected _user: WarPlayer;

  constructor() {
    super();
    this.deck = new Deck(this.gameInfo);
    this._user = new WarPlayer(0, "USER", "user", [], 0);
    this._cpu = new WarPlayer(0, "CPU", "cpu", [], 0);
    this._players = [this._cpu, this._user];
  }

  public assignPlayersHand(): void {
    for (let i = 0; i < this.gameInfo.initialHand; i++) {
      for (let player of this.players) {
        const card = this.deck.drawOne();
        if (card) player.addACardToHand(card);
        else console.error("There aren't any more cards.");
      }
    }
  }

  public initForNewGame() {
    this.initDeck();
    for (let player of this.players) {
      player.initForNewGame();
    }
    this.assignPlayersHand();
  }

  public playersSelectCard(index: number) {
    this._cpu.cpuSelectCard();
    this._user.userSelectCard(index);
  }

  // 場に出たカードの比較
  public compareCard() {
    const userCard = this._user._selectedCard;
    const cpuCard = this._cpu._selectedCard;
    if (userCard && cpuCard) {
      const userCardRank = userCard.getRankNumber();
      const cpuCardRank = cpuCard.getRankNumber();
      if (userCardRank == cpuCardRank) {
        this.stock.push(userCard);
        this.stock.push(cpuCard);
      } else if (userCardRank > cpuCardRank) {
        this.winTheComparison(this._user);
        this._user.obtainCard(userCard);
      } else if (userCardRank < cpuCardRank) {
        this.winTheComparison(this._cpu);
        this._cpu.obtainCard(cpuCard);
      }
    }
    this._user.selectedCard = null;
    this._cpu.selectedCard = null;
  }

  public winTheComparison(player: WarPlayer) {
    let score = 2;
    score += this.stock.length;
    player.incrementScore(score);
    this.stock = [];
  }

  public isGameOver() {
    return this._user.hand.length === 0 && this._cpu.hand.length === 0;
  }

  public setResult() {
    const userScore = this._user.score;
    const cpuScore = this._cpu.score;
    this._gameResult =
      userScore > cpuScore ? "Win" : cpuScore > userScore ? "Lose" : "Draw";
  }

  public initDeck() {
    this.deck.resetDeck();
    this.deck.shuffleDeck();
  }

  public setUserName(name: string) {
    this._user.name = name;
  }

  public get gameInfo() {
    return this._gameInfo;
  }
  public get players(): WarPlayer[] {
    return this._players;
  }
  public set players(v: WarPlayer[]) {
    this._players = v;
  }
  public get cpu(): WarPlayer {
    return this._cpu;
  }
  public set cpu(v: WarPlayer) {
    this._cpu = v;
  }
  public get user(): WarPlayer {
    return this._user;
  }
  public set user(v: WarPlayer) {
    this._user = v;
  }
  public get score(): WarPlayer {
    return this.score;
  }

  public get gameResult(): "Win" | "Lose" | "Draw" | "YetDecided" {
    return this._gameResult;
  }
  public set gameResult(gameResult: string) {
    throw new Error("Method not implemented.");
  }
  public get gamePhase(): string {
    throw new Error("Method not implemented.");
  }
  public set gamePhase(gamePhase: string) {
    throw new Error("Method not implemented.");
  }
}
