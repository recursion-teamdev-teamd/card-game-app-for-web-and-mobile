import { Card } from "../card/card";
import { BlackjackTable } from "../table/table";
import { BlackJackGameResult } from "../gameResult/gameResult";
import { BlackjackPlayerStatus } from "../playerStatus/playerStatus";
import {
  AbstractPokerPlayer,
  GambleDealer,
  GamblePlayer,
  ScoreGamePlayer,
  VanilaPlayer,
} from "./abstractPlayer";
import { BlackjackPlayerType } from "../playerType/playerType";

// 基本的なVanilaPlayerクラスから拡張した、手札スコア制でもギャンブルでもないゲームのPlayerクラス
export class SpeedPlayer extends VanilaPlayer {}

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

  // 初期化
  protected initForNewGame() {
    this.hand = [];
    this.bet = 0;
    this.playerStatus = "Betting";
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
  // Bustかどうかを判定
  public isBust(): boolean {
    return this.getHandScore() > 21;
  }
  // BlackJackかどうかを判定
  public isBlackJack(): boolean {
    return this.getHandScore() == 21;
  }

  // playerがアクション終了しているか
  public isPlayerDoneWithAction() {
    return (
      this.playerStatus === "Stand" ||
      this.playerStatus === "Bust" ||
      this.playerStatus === "DoubleBust"
    );
  }
  //

  // Bet関連

  // AIにベットさせる関数　ブラックジャックではとりあえず所持金の30%をかけさせてます
  public makeAIInitialBet(): void {
    const curChips = this.chips;
    this.bet = curChips * 0.3;
  }

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
}

// チップをベットする系のゲームのディーラー
export class BlackjackDealer extends GambleDealer {}

// ギャンブル系の中でも、ポーカー系のゲームのプレイヤー
export class PokerPlayer extends AbstractPokerPlayer {}

export class TexasPokerPlayer extends AbstractPokerPlayer {}
