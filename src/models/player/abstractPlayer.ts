import { Card } from "../card/card";

// 全てのPlayerの基盤となる抽象クラス
export abstract class VanilaPlayer {
  abstract id: number;
  abstract name: string;
  abstract playerType: string;
  abstract playerStatus: string;
  abstract hand: Card[];

  constructor(
    id: number,
    name: string,
    playerType: string,
    playerStatus: string,
    hand: Card[]
  ) {
    this.setID(id);
    this.setName(name);
    this.setPlayerStatus(playerStatus);
    this.setHand(hand);
  }
  protected setID(id: number) {
    this.id = id;
  }
  protected getID() {
    return this.id;
  }
  protected setName(name: string) {
    this.name = name;
  }
  protected getName() {
    return this.name;
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
  protected clearHand() {
    this.setHand([]);
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

  constructor(
    id: number,
    name: string,
    playerType: string,
    playerStatus: string,
    hand: Card[],
    chips: number,
    bet: number
  ) {
    super(id, name, playerType, playerStatus, hand);
    this.setChips(chips);
    this.setBet(bet);
  }

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
  abstract getHandScore(): number;
  abstract updateChips(): void;
}
// ギャンブルゲームのディーラー
export abstract class GambleDealer extends VanilaPlayer {}

// ギャンブルの中でも、各種ポーカーのプレイヤー
export abstract class AbstractPokerPlayer extends GamblePlayer {
  abstract isAbleToCall: (callAmount: number) => boolean;
  abstract isAbleToRaise: (raiseAmount: number) => boolean;
}
