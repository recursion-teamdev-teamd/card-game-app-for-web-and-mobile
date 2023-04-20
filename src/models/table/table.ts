import {
  gameInfoWar,
  gameInfoBlackJack,
  gameInfoSpeed,
} from "./../gameInfo/gameInfo";
import { BlackjackGameResult } from "../gameResult/gameResult";
import { BlackjackGamePhase, GambleGamePhase } from "../gamePhase/gamePhase";
import { SpeedGamePhase } from "../gamePhase/gamePhase";
import { SpeedGameResult } from "../gameResult/gameResult";
import { Deck } from "../deck/deck";
import { GameInfo } from "../gameInfo/gameInfo";
<
import { WarPlayer } from "../player/player";

import {
  AbstractPokerTable,
  GambleTable,
  VanilaTable,
  TurnGameTable,
} from "./abstractTable";

import { Card } from "../card/card";

// ターンの概念が無いゲーム

export class WarTable extends TurnGameTable {
  getPlayerOnTurn(): VanilaPlayer {
    throw new Error("Method not implemented.");
  }
  protected _deck: Deck = new Deck(gameInfoWar);
  protected _gameResult: string = "";
  protected _gamePhase: string = "";
  protected _players: WarPlayer[];
  readonly _gameInfo: GameInfo = gameInfoWar;
  protected stock: number = 2;
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

  // 場に出たカードの比較
  public compareCard() {
    const cpu = this.cpu;
    const user = this.user;

    const cpuCard = this.getRankNumber(cpu.selectedCard);
    const userCard = this.getRankNumber(user.selectedCard);

    if (userCard == cpuCard) {
      this.stock += 2;
    } else if (userCard > cpuCard) {
      user.score += this.stock;
    } else if (userCard < cpuCard) {
      cpu.score += this.stock;
    }
  }

  public initDeck() {
    this.deck.resetDeck();
    this.deck.shuffleDeck();

  }

  public setUserName(name: string) {
    this._user.name = name;
  }

  public splitHalfOfDeck(): void {
    for (let i = 0; i < 26; i++) {
      const card = this.deck.drawOne();
      if (card) this.user.addACardToHand(card);
      if (card) this.cpu.addACardToHand(card);

    }
  }

  public getRankNumber(card: Card) {
    const rank = card.rank;
    if (rank === "A") {
      return 1;
    } else if (rank === "J") {
      return 11;
    } else if (rank === "Q") {
      return 12;
    } else if (rank === "K") {
      return 13;
    } else {
      return parseInt(rank);
    }
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
  public get gameResult(): string {
    throw new Error("Method not implemented.");
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

export class SpeedTable extends VanilaTable {
  private _gameInfo: GameInfo = gameInfoSpeed;
  private _players: SpeedPlayer[];
  private _user: SpeedPlayer;
  private _house: SpeedPlayer;
  private _deck: Deck;
  private _gamePhase: SpeedGamePhase;
  private _gameResult: SpeedGameResult;

  constructor(userName: string) {
    super();
    this._user = new SpeedPlayer(0, userName, "user", "roundOver", []);
    this._house = new SpeedPlayer(1, "house", "ai", "roundOver", []);
    this._players = [this.user, this.house];
    this._deck = new Deck(this._gameInfo);
    this._gamePhase = "firstRound";
    this._gameResult = "yetDecided";
  }

  public initTableForNewGame() {
    this.deck.resetDeck();
    this.deck.shuffleDeck();
    this._gamePhase = "roundOver";
    this._gameResult = "yetDecided";
    this.house.hand = [];
    this.user.hand = [];
  }
  public assignPlayersHand() {
    const deckCardLength = this.deck.cards.length;
    for (let index = 0; index < deckCardLength / 2; index++) {
      this.user.hand.push(this.deck.drawOne()!);
      this.house.hand.push(this.deck.drawOne()!);
    }
  }

  public get gamePhase(): SpeedGamePhase {
    return this._gamePhase;
  }

  public set gamePhase(v: SpeedGamePhase) {
    this._gamePhase = v;
  }

  public get players(): SpeedPlayer[] {
    return this._players;
  }
  public set players(v: SpeedPlayer[]) {
    this._players = v;
  }
  public get gameInfo() {
    return this._gameInfo;
  }

  public get deck(): Deck {
    return this._deck;
  }


  public set deck(v: Deck) {
    this._deck = v;
  }

  public get house(): SpeedPlayer {
    return this._house;
  }

  public get user(): SpeedPlayer {
    return this._user;
  }

  public set user(v: SpeedPlayer) {
    this._user = v;
  }
}

// ポーカー系のゲーム
export class PokerTable extends AbstractPokerTable {}

export class TexasPokerTable extends AbstractPokerTable {}
