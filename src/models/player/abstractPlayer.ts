import { Card } from "../card/card";

// 全てのPlayerの基盤となる抽象クラス
export abstract class VanilaPlayer {
  abstract id: number;
  abstract name: string;
  abstract playerType: string;
  abstract playerStatus: string;
  abstract hand: Card[];

  protected setID(id: number) {
    this.id = id;
  }
  protected getID() {
    return this.id;
  }

  protected setPlayerStatus(playerStatus: string) {
    this.playerStatus = playerStatus;
  }
  protected getPlayerStatus() {
    return this.playerStatus;
  }

  protected setHand(hand: Card[]) {
    this.hand = hand;
  }
  protected getHand() {
    return this.hand;
  }
}

// スコア制ゲームのPlayer
export abstract class ScoreGamePlayer extends VanilaPlayer {
  abstract score: number;

  protected getScore() {
    return this.score;
  }
  protected setScore(score: number) {
    this.score = score;
  }
}

// ギャンブルゲームのPlayer
export abstract class GamblePlayer extends VanilaPlayer {
  abstract chips: number;
  abstract bet: number;

  protected getBet() {
    return this.bet;
  }

  protected setBet(bet: number) {
    this.bet = bet;
  }
  protected getChips() {
    return this.chips;
  }
  protected setChips(chips: number) {
    this.chips = chips;
  }
}
// ギャンブルゲームのディーラー
export abstract class GambleDealer extends VanilaPlayer {}

// ギャンブルの中でも、各種ポーカーのプレイヤー
export abstract class AbstractPokerPlayer extends GamblePlayer {
  abstract isAbleToCall: (callAmount: number) => boolean;
  abstract isAbleToRaise: (raiseAmount: number) => boolean;
}
