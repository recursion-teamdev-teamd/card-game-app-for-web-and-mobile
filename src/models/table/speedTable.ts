import { SpeedGameResult } from "./../gameResult/gameResult";
import { SpeedGamePhase } from "./../gamePhase/gamePhase";
import { Deck } from "./../deck/deck";
import { SpeedPlayer } from "./../player/speedPlayer";
import { GameInfo, gameInfoSpeed } from "./../gameInfo/gameInfo";
import { VanilaTable } from "./abstractTable";

export class SpeedTable extends VanilaTable {
  public get gameResult(): string {
    throw new Error("Method not implemented.");
  }
  public set gameResult(gameResult: string) {
    throw new Error("Method not implemented.");
  }
  protected _gameInfo: GameInfo = gameInfoSpeed;
  protected _players: SpeedPlayer[];
  protected _user: SpeedPlayer;
  protected _house: SpeedPlayer;
  protected _deck: Deck;
  protected _gamePhase: SpeedGamePhase;
  protected _gameResult: SpeedGameResult;

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

  public assignPlayersHand(): void {
    for (let i = 0; i < this.gameInfo.initialHand; i++) {
      for (let player of this.players) {
        const card = this.deck.drawOne();
        if (card) player.addACardToHand(card);
        else console.error("There aren't any more cards.");
      }
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
