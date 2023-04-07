import { gameInfoWar, gameInfoBlackJack } from "./../gameInfo/gameInfo";
import { BlackjackGameResult } from "../gameResult/gameResult";
import { BlackjackGamePhase, GambleGamePhase } from "../gamePhase/gamePhase";
import { BlackjackPlayerStatus } from "../playerStatus/playerStatus";
import { GamblePlayer, VanilaPlayer } from "../player/abstractPlayer";
import { BlackjackPlayerType } from "../playerType/playerType";
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

// Blackjackのテーブル
export class BlackjackTable extends GambleTable {
  readonly _gameInfo: GameInfo = gameInfoBlackJack;

  protected _betDenominations: number[] = [];
  protected _deck: Deck;
  protected _gamePhase: BlackjackGamePhase;
  protected _gameResult: BlackjackGameResult;

  protected _players: BlackjackPlayer[];
  protected _house: BlackjackPlayer;

  constructor(userName: string) {
    super();
    this._deck = new Deck(this.gameInfo);
    this._house = new BlackjackPlayer(0, "House", [], 200, 0, "AI", "Waiting");
    this._players = [
      new BlackjackPlayer(1, "AI1", [], 200, 0, "AI", "Betting"),
      new BlackjackPlayer(2, "You", [], 200, 0, "USER", "Betting"),
      new BlackjackPlayer(3, "AI2", [], 200, 0, "AI", "Betting"),
    ];
    this._gamePhase = "Betting";
    this._gameResult = "YetDecided";
  }

  // setter,getter
  public get gamePhase(): BlackjackGamePhase {
    return this._gamePhase;
  }
  protected set gamePhase(gamePhase: BlackjackGamePhase) {
    this._gamePhase = gamePhase;
  }

  public get gameResult(): BlackjackGameResult {
    return this._gameResult;
  }
  public set gameResult(gameResult: BlackjackGameResult) {
    this._gameResult = gameResult;
  }

  protected get players(): BlackjackPlayer[] {
    return this._players;
  }
  protected set players(v: BlackjackPlayer[]) {
    this._players = v;
  }
  public get gameInfo() {
    return this._gameInfo;
  }

  public get house(): BlackjackPlayer {
    return this._house;
  }

  // playerのアクション関連（ハウスにも使える)
  public setPlayerHit(player: BlackjackPlayer) {
    const card = this.deck.drawOne();
    // カードがundefindedじゃない場合に限りアクション実行
    if (card) player.actionHit(card);
  }

  public setPlayerStand(player: BlackjackPlayer) {
    player.actionStand();
  }

  public setPlayerDouble(player: BlackjackPlayer) {
    const card = this.deck.drawOne();
    // カードがundefindedじゃない場合に限りアクション実行
    if (card) player.actionDouble(card);
  }

  // AIの判断関連

  // houseのアクション判断ロジック＆実行
  public makeHouseAction() {
    this.house.getHandScore() < 17
      ? this.setPlayerHit(this.house)
      : this.setPlayerStand(this.house);
  }

  // AIPlayerのアクション判断ロジック＆実行 とりあえずある程度チートシートに則った賢いAIのロジック
  public makeAIInitialPlayerAction(player: BlackjackPlayer) {
    const curScore = player.getHandScore();
    if (curScore >= 17) this.setPlayerStand(player);
    else if (curScore <= 9) this.setPlayerHit(player);
    else if (curScore === 10 || curScore === 11) this.setPlayerDouble(player);
    else {
      const houseScore = this.house.getHandScore();
      if (houseScore <= 6) this.setPlayerStand(player);
      else this.setPlayerHit(player);
    }
  }

  // Bet関連
  // 全てのAIプレイヤーに最初のベットをさせる
  public makeAllAIInitialBet(): void {
    for (let player of this.players) {
      if (player._playerType === "AI") player.makeAIInitialBet();
    }
  }

  public haveTableTurn() {
    for (let player of this.players) this.havePlayerTurn(player);
    if (this.isRoundOver()) {
      this.setGameResult();
      this.gamePhase = GambleGamePhase.roundOver;
      this.processAfterRoundOver();
    }
    if (
      this.user.playerStatus == BlackJackPlayerStatus.roundOver &&
      this.gameResult == BlackJackGameResult.yetDecided
    ) {
      this.haveTableTurn();
    }
  }

  public havePlayerTurn(player: BlackjackPlayer) {
    console.log("havePlayerTurn", player.name, player.playerStatus);
    if (player.playerStatus == BlackJackPlayerStatus.roundOver) return;

    if (player.playerType != BlackJackPlayerType.USER)
      player.playerStatus = this.decidePlayerStatus(player);

    if (player.playerStatus == BlackJackPlayerStatus.hit) {
      this.hit(player);
      player.playerStatus = BlackJackPlayerStatus.waiting;
    }

    if (player.playerStatus == BlackJackPlayerStatus.stand) {
      this.stand(player);
      player.playerStatus = BlackJackPlayerStatus.roundOver;
    }

    if (player.isGameOver() || player.isBlackJack())
      player.playerStatus = BlackJackPlayerStatus.roundOver;
    console.log("res", player.name, player.playerStatus);
  }

  public isRoundOver(): boolean {
    if (this.house.isGameOver()) return true;
    if (this.user.isGameOver()) return true;
    if (this.house.isBlackJack()) return true;
    if (this.user.isBlackJack()) return true;
    for (let player of this.players) {
      if (player.playerStatus != BlackJackPlayerStatus.roundOver) return false;
    }
    return true;
  }

  public decidePlayerStatus(player: BlackjackPlayer) {
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
    console.log(this.gameResult);
  }

  public processAfterRoundOver() {
    if (this.gameResult == BlackJackGameResult.win) {
      if (this.user.isBlackJack())
        this.user.chips += Math.floor(this.user.bet * 1.5);
      else this.user.chips += this.user.bet;
    }
    if (this.gameResult == BlackJackGameResult.lose)
      this.user.chips -= this.user.bet;
  }

  public initTableForNewGame() {
    this.initDeck();
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
}

// ポーカー系のゲーム
export class PokerTable extends AbstractPokerTable {}

export class TexasPokerTable extends AbstractPokerTable {}
