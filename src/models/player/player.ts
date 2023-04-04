import { Card } from "../card/card";
import { BlackjackTable } from "../table/table";
import { BlackJackGameResult } from "../gameResult/gameResult";
import { BlackJackPlayerStatus } from "../playerStatus/playerStatus";
import {
  AbstractPokerPlayer,
  GambleDealer,
  GamblePlayer,
  ScoreGamePlayer,
  VanilaPlayer,
} from "./abstractPlayer";

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

  // ランダムにカードを取り出す, typeCard
  public cpuSelectCard() {
    return this.hand[Math.floor(Math.random() * 26)];
  }

  // 特定のインデックスのカードを取り出す, typeCard
  public userSelectCard() {
    return this.hand.indexOf(this.selectedCard);
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
  constructor(
    id: number,
    name: string,
    playerType: string,
    playerStatus: string,
    hand: Card[]
  ) {
    super(id, name, playerType, playerStatus, hand);
    this.chips = 400;
    this.bet = 0;
  }

  public initForNewGame() {
    this.hand = [];
    this.bet = 0;
    this.playerStatus = BlackJackPlayerStatus.bet;
  }

  public isGameOver(): boolean {
    if (this.getHandScore() > 21) return true;
    return false;
  }
  public isBlackJack(): boolean {
    if (this.getHandScore() == 21) return true;
    return false;
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
