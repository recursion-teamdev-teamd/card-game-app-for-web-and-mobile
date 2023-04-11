import { BlackjackGameResult } from "./../gameResult/gameResult";
import { Card } from "../card/card";
import { BlackjackPlayerStatus } from "../playerStatus/playerStatus";
import {
  AbstractPokerPlayer,
  GamblePlayer,
  ScoreGamePlayer,
  VanilaPlayer,
} from "./abstractPlayer";
import { BlackjackPlayerType } from "../playerType/playerType";

// 基本的なVanilaPlayerクラスから拡張した、手札スコア制でもギャンブルでもないゲームのPlayerクラス
export class SpeedPlayer extends VanilaPlayer {
  constructor(
    id: number,
    name: string,
    playerType: string,
    playerStatus: string,
    hand: Card[]
  ) {
    super();
    this.id = id;
    this.name = name;
    this.playerType = playerType;
    this.playerStatus = playerStatus;
    this.hand = [];
  }

  public initForNewGame() {
    this.hand = [];
    this.playerStatus = BlackJackPlayerStatus.bet;
  }
}

// スコア制のゲームのプレイヤー(ギャンブルではないプレイヤー)
export class RummyPlayer extends ScoreGamePlayer {}

export class WarPlayer extends ScoreGamePlayer {
  _score: number;
  _id: number;
  _name: string;
  _playerType: "user" | "cpu";
  _playerStatus: string;
  _hand: Card[];
  _selectedCard: Card | null = null;
  constructor(
    id: number,
    name: string,
    playerType: "user" | "cpu",
    hand: Card[],
    score: number
  ) {
    super(id, name, hand, score);
    this._playerType = playerType;
  }

  public initForNewGame() {
    this.hand = [];
    this.score = 0;
  }

  // ランダムにカードを取り出す
  public cpuSelectCard() {
    return this.hand.splice(Math.floor(Math.random() * 26));
  }

  // 特定のインデックスのカードを取り出す
  public userSelectCard(index: number) {
    return this.hand.splice(index, 1);
  }

  public get selectedCard(): Card {
    return this.selectedCard;
  }
  public set selectedCard(card: Card) {
    this.selectedCard = card;
  }
}

// チップをベットするゲームのプレイヤー
export class BlackjackPlayer extends GamblePlayer {
  readonly _playerType: BlackjackPlayerType;
  protected _playerStatus: BlackjackPlayerStatus;
  protected _result: BlackjackGameResult = "YetDecided";

  constructor(
    id: number,
    name: string,
    hand: Card[],
    chips: number,
    bet: number,
    playerType: BlackjackPlayerType,
    playerStatus: BlackjackPlayerStatus
  ) {
    super(id, name, hand, chips, bet);
    this._playerType = playerType;
    this._playerStatus = playerStatus;
  }

  public get playerStatus(): BlackjackPlayerStatus {
    return this._playerStatus;
  }
  protected set playerStatus(playerStatus: BlackjackPlayerStatus) {
    this._playerStatus = playerStatus;
  }

  public get playerType(): BlackjackPlayerType {
    return this._playerType;
  }

  protected set result(v: BlackjackGameResult) {
    this._result = v;
  }
  public get result(): BlackjackGameResult {
    return this._result;
  }

  // 初期化
  public initForNewGame() {
    if (this.result !== "Game Over") {
      this.hand = [];
      this.bet = 0;
      this.playerStatus = "Betting";
      this.result = "YetDecided";
    } else {
      this.playerStatus = "Game Over";
    }
  }

  // Bet関連

  // AIにベットさせる関数　ブラックジャックではとりあえず所持金の30%をかけさせてます
  public makeAIInitialBet(): void {
    const curChips = this.chips;
    this.bet = curChips * 0.3;
    this.playerStatus = "Playing";
  }

  public setUserBet(bet: number) {
    if (this.playerType === "USER") {
      this.bet = bet;
      this.playerStatus = "Playing";
    } else console.error("can't use `setUserBet for non-user player.`");
  }

  // playerActon関連
  // Hitの関数
  public actionHit(card: Card) {
    this.playerStatus = "Hit";
    this.addACardToHand(card);
    if (this.isBust()) this.playerStatus = "Bust";
  }
  // standの関数
  public actionStand() {
    this.playerStatus = "Stand";
  }
  // doubleの関数
  public actionDouble(card: Card) {
    this.playerStatus = "Double";
    this.addACardToHand(card);
    if (this.isBust()) this.playerStatus = "DoubleBust";
  }

  public actionSurrender() {
    this.playerStatus = "Surrender";
  }
  // Bustかどうかを判定
  public isBust(): boolean {
    return this.getHandScore() > 21;
  }
  // BlackJackかどうかを判定
  public isBlackjack(): boolean {
    return this.hand.length === 2 && this.getHandScore() == 21;
  }

  // score換算
  public getHandScore(): number {
    let handScore = 0;
    let aceCount = 0;

    for (let card of this.hand) {
      handScore += card.getRankNumberInBlackJack();
      if (card.isAce()) aceCount += 1;
    }

    if (handScore > 21) {
      while (aceCount > 0 && handScore <= 21) {
        handScore -= 10;
        aceCount--;
      }
    }
    return handScore;
  }

  // playerがアクション終了していないか
  public isPlayerStillPlaying() {
    console.log(`isPlayerStillPlaying ${this.name} ${this.playerStatus}`);
    return this.playerStatus === "Hit" || this.playerStatus === "Playing";
  }
  // HouseをPlayingにする
  public setHousePlaying() {
    this.playerType === "HOUSE"
      ? (this.playerStatus = "Playing")
      : console.error("Cannot use `setHousePlaying for non-house players.`");
  }

  // result関連

  // 勝った額を受け取ってステータスをwinに変更
  public resultWin(incrementAmount: number) {
    this.incrementChips(incrementAmount);
    this.result = "Win";
  }

  // 失う額を受け取ってステータスをloseに変更
  public resultLose(decrementAmount: number) {
    if (this.isAbleToDecrementChips(decrementAmount)) {
      this.decrementChips(decrementAmount);
      this.result = "Lose";
    } else {
      this.decrementChips(this.chips);
      this.result = "Game Over";
    }
  }

  public resultDraw() {
    this.result = "Draw";
  }
}

// ギャンブル系の中でも、ポーカー系のゲームのプレイヤー
export class PokerPlayer extends AbstractPokerPlayer {}

export class TexasPokerPlayer extends AbstractPokerPlayer {}
