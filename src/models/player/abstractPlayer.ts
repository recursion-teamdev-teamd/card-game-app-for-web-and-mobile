import { Card } from "../card/card";
import { GambleTable } from "../table/abstractTable";

// 全てのPlayerの基盤となる抽象クラス
export abstract class VanilaPlayer {
  abstract _id: number;
  abstract _name: string;
  abstract _playerType: string;
  abstract _playerStatus: string;
  abstract _hand: Card[];

  public set id(v: number) {
    this._id = v;
  }

  public get id(): number {
    return this._id;
  }

  public set name(v: string) {
    this._name = v;
  }

  public get name(): string {
    return this._name;
  }

  public get playerStatus(): string {
    return this._playerStatus;
  }

  public set playerStatus(v: string) {
    this._playerStatus = v;
  }

  public get playerType(): string {
    return this._playerType;
  }

  public set playerType(v: string) {
    this._playerType = v;
  }

  public get hand(): Card[] {
    return this._hand;
  }

  public set hand(v: Card[]) {
    this._hand = v;
  }

  public clearHand() {
    this.hand = [];
  }
}

// スコア制ゲームのPlayer
export abstract class ScoreGamePlayer extends VanilaPlayer {
  abstract _score: number;

  constructor(
    id: number,
    name: string,
    hand: Card[],
    score: number
  ) {
    super();
    this.id = id;
    this.name = name;
    this.hand = hand;
    this.score = score;
  }

  public get score(): number {
    return this.score;
  }
  public set score(score: number) {
    this.score = score;
  }
}

// ギャンブルゲームのPlayer
export abstract class GamblePlayer extends VanilaPlayer {
  abstract _chips: number;
  abstract _bet: number;
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
    this.hand = hand;
  }

  public get chips(): number {
    return this._chips;
  }

  public set chips(v: number) {
    this._chips = v;
  }

  public get bet(): number {
    return this._bet;
  }

  public set bet(v: number) {
    this._bet = v;
  }

  abstract getHandScore(): number;
  // abstract updateChips(): void;
}
// ギャンブルゲームのディーラー
export abstract class GambleDealer extends VanilaPlayer {}

// ギャンブルの中でも、各種ポーカーのプレイヤー
export abstract class AbstractPokerPlayer extends GamblePlayer {
  abstract isAbleToCall: (callAmount: number) => boolean;
  abstract isAbleToRaise: (raiseAmount: number) => boolean;
}
