import { Card } from "../card/card";
import { BlackjackTable } from "../table/table";
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

export class WarPlayer extends ScoreGamePlayer {}

// チップをベットするゲームのプレイヤー
export class BlackjackPlayer extends GamblePlayer {
  constructor(
    id: number,
    name: string,
    playerType: string,
    playerStatus: string,
    hand: Card[],
    chips: number,
    bet: number
  ) {
    super(id, name, playerType, playerStatus, hand, chips, bet);
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

  public updateChips(blackjackTable: BlackjackTable): void {
    if (blackjackTable.gameResult == BlackJackPlayerStatus.prototype) {
    }
    if (this.isBlackJack()) {
      this.setChips(Math.floor(this.getChips() + this.getBet() * 1.5));
    }
  }
}

// チップをベットする系のゲームのディーラー
export class BlackjackDealer extends GambleDealer {}

// ギャンブル系の中でも、ポーカー系のゲームのプレイヤー
export class PokerPlayer extends AbstractPokerPlayer {}

export class TexasPokerPlayer extends AbstractPokerPlayer {}
