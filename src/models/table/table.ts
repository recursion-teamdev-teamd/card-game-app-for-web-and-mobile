import { gameInfoWar, gameInfoBlackJack } from "./../gameInfo/gameInfo";
import { BlackJackGameResult } from "../gameResult/gameResult";
import { GambleGamePhase } from "../gamePhase/gamePhase";
import { BlackJackPlayerStatus } from "../playerStatus/playerStatus";
import { VanilaPlayer } from "../player/abstractPlayer";
import { BlackJackPlayerType } from "../playerType/playerType";
import { Deck } from "../deck/deck";
import { GameInfo } from "../gameInfo/gameInfo";
import { BlackjackPlayer } from "../player/player";
import {
  AbstractPokerTable,
  GambleTable,
  VanilaTable,
  TurnGameTable,
} from "./abstractTable";
// ターンの概念が無いゲーム
export class WarTable extends VanilaTable {}

export class SpeedTable extends VanilaTable {}

// ターンの概念があり、賭け金がいらないゲーム
export class RummyTable extends TurnGameTable {}

// ターンの概念があり、賭け金を要するゲーム
export class BlackjackTable extends GambleTable {
  private _gameInfo: GameInfo = gameInfoBlackJack;
  private _players: BlackjackPlayer[] = [];
  private _house: BlackjackPlayer = new BlackjackPlayer(
    0,
    "house",
    BlackJackPlayerType.AI,
    BlackJackPlayerStatus.bet,
    []
  );

  private _user: BlackjackPlayer = new BlackjackPlayer(
    1,
    "user",
    BlackJackPlayerType.USER,
    BlackJackPlayerStatus.bet,
    []
  );

  constructor(userName: string) {
    super();
    this.deck = new Deck(this.gameInfo);
    this.user = new BlackjackPlayer(
      0,
      userName,
      BlackJackPlayerType.USER,
      BlackJackPlayerStatus.bet,
      []
    );
    this.players = [this.house, this.user];
    this.gamePhase = GambleGamePhase.betting;
    this.gameResult = BlackJackGameResult.yetDecided;
  }

  public haveTableTurn() {
    for (let player of this.players) this.havePlayerTurn(player);
    if (this.isRoundOver()) {
      this.setGameResult();
      this.processAfterRoundOver();
    }
    if (this.user.playerStatus == BlackJackPlayerStatus.roundOver) {
      this.haveTableTurn();
    }
  }

  public havePlayerTurn(player: BlackjackPlayer) {
    if (player.playerType != BlackJackPlayerType.USER)
      player.playerStatus = this.dicidePlayerStatus(player);
    if (player.playerStatus == BlackJackPlayerStatus.hit) this.hit(player);
    if (player.playerStatus == BlackJackPlayerStatus.stand) this.stand(player);
  }

  public isRoundOver(): boolean {
    for (let player of this.players) {
      if (player.playerStatus != BlackJackPlayerStatus.roundOver) return false;
    }
    return true;
  }

  public dicidePlayerStatus(player: BlackjackPlayer) {
    if (player.playerStatus == BlackJackPlayerStatus.roundOver)
      return player.playerStatus;
    if (player.getHandScore() >= 17) return BlackJackPlayerStatus.stand;
    return BlackJackPlayerStatus.hit;
  }

  public setGameResult() {
    const house = this.house;
    const user = this.user;

    if (user.getHandScore() > house.getHandScore())
      this.gameResult = BlackJackGameResult.win;
    else if (user.getHandScore() == house.getHandScore())
      this.gameResult = BlackJackGameResult.push;
    else this.gameResult = BlackJackGameResult.lose;

    if (
      (house.isBlackJack() && user.isBlackJack()) ||
      (house.isGameOver() && user.isGameOver())
    )
      this.gameResult = BlackJackGameResult.push;

    if (house.isBlackJack()) this.gameResult = BlackJackGameResult.lose;
    if (user.isBlackJack()) this.gameResult = BlackJackGameResult.win;
    if (house.isGameOver()) this.gameResult = BlackJackGameResult.win;
    if (user.isGameOver()) this.gameResult = BlackJackGameResult.lose;
  }

  public processAfterRoundOver() {
    console.log("over");

    if (this.gameResult == BlackJackGameResult.win) {
      if (this.user.isBlackJack())
        this.user.chips += Math.floor(this.user.bet * 1.5);
      else this.user.chips += this.user.bet;
      if (this.gameResult == BlackJackGameResult.lose)
        this.user.chips -= this.user.bet;
    }
  }

  public initTableForNewGame() {
    this.initDeck();
    this.turnCounter = 0;
    this.gameResult = BlackJackGameResult.yetDecided;
    this.gamePhase = GambleGamePhase.betting;
    for (let player of this.players) player.initForNewGame();
    this.assignPlayersHand();
  }

  public initDeck() {
    this.deck.resetDeck();
    this.deck.shuffleDeck();
  }

  public assignPlayersHand() {
    for (let player of this.players) {
      this.hit(player);
      this.hit(player);
    }
  }

  public hit(player: BlackjackPlayer) {
    player.hand.push(this.deck.drawOne()!);
    if (player.isGameOver() || player.isBlackJack())
      player.playerStatus = BlackJackPlayerStatus.roundOver;

    player.playerStatus = BlackJackPlayerStatus.waiting;
  }
  public stand(player: BlackjackPlayer) {
    player.playerStatus = BlackJackPlayerStatus.roundOver;
  }

  public get players(): BlackjackPlayer[] {
    return this._players;
  }
  public set players(v: BlackjackPlayer[]) {
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

  public get house(): BlackjackPlayer {
    return this._house;
  }

  public get user(): BlackjackPlayer {
    return this._user;
  }

  public set user(v: BlackjackPlayer) {
    this._user = v;
  }
}

// ポーカー系のゲーム
export class PokerTable extends AbstractPokerTable {}

export class TexasPokerTable extends AbstractPokerTable {}
