import { error } from "console";
import { VanilaPlayerType } from "./../playerType/playerType";
import { Card } from "../card/card";
import { GambleTable } from "../table/abstractTable";

// 全てのPlayerの基盤となる抽象クラス
export abstract class VanilaPlayer {
  private _id: number;
  private _name: string;
  private _hand: Card[];
  protected abstract _result: string;
  protected abstract _playerStatus: string;
  protected abstract _playerType: string;
  static cpuNamePatterns = [
    "John",
    "Jane",
    "Michael",
    "Emma",
    "William",
    "Olivia",
    "James",
    "Sophia",
    "Benjamin",
    "Isabella",
    "Lucas",
    "Mia",
    "Henry",
    "Charlotte",
    "Alexander",
    "Amelia",
    "Sebastian",
    "Harper",
    "Ethan",
    "Evelyn",
    "Daniel",
    "Abigail",
    "Matthew",
    "Emily",
    "Joseph",
    "Elizabeth",
    "David",
    "Sofia",
    "Jackson",
    "Avery",
    "Samuel",
    "Ella",
    "Gabriel",
    "Scarlett",
    "Carter",
    "Grace",
    "Luke",
    "Chloe",
    "Anthony",
    "Victoria",
    "Isaac",
    "Riley",
    "Dylan",
    "Madison",
    "Leo",
    "Zoe",
    "Max",
    "Lily",
    "Nathan",
    "Hannah",
  ];

  constructor(id: number, name: string, hand: Card[]) {
    this._id = id;
    this._name = name;
    this._hand = hand;
  }

  protected set id(v: number) {
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

  abstract get playerType(): string;

  abstract get playerStatus(): string;

  abstract set playerStatus(v: string);

  protected abstract set result(v: string);

  abstract get result(): string;
  //  ↓手札関連のメソッド　//

  public get hand(): Card[] {
    return this._hand;
  }

  public set hand(v: Card[]) {
    this._hand = v;
  }

  // カードを一枚手札に加える関数
  public addACardToHand(card: Card) {
    this._hand.push(card);
  }
  // 特定のインデックスのカードを手札から除く関数
  public removeACardFromHand(index: number) {
    this._hand.splice(index, 1);
  }

  public getACardFromHand(index: number) {
    return this._hand[index];
  }

  public popACardFromHand(index: number) {
    const card = this.getACardFromHand(index);
    this.removeACardFromHand(index);
    return card;
  }
  // sort
  public sortHand() {
    Card.sortCards(this.hand);
  }

  public resetHand() {
    this.hand = [];
  }

  //  ↑手札関連のメソッドここまで　//

  // abstract get playerStatus()

  // protected abstract set playerStatus(playerStatus : string)
}

// スコア制ゲームのPlayer
export abstract class ScoreGamePlayer extends VanilaPlayer {
  private _score: number;

  constructor(id: number, name: string, hand: Card[], score: number) {
    super(id, name, hand);
    this._score = score;
  }

  public get score() {
    return this._score;
  }

  protected set score(score: number) {
    this._score = score;
  }

  // 引数のvalue分だけスコアを加算するメソッド
  public incrementScore(value: number) {
    const cur = this.score;
    this.score = cur + value;
  }

  // 引数のvalue分だけスコアをマイナスするメソッド
  public decrementScore(value: number) {
    const cur = this.score;
    this.score = cur - value;
  }
  // 引数のvalue分マイナスできるか（０以下にならないか）
  protected isAbleToDecrementScore(value: number): boolean {
    return this.score >= value;
  }

  public resetScoreToZero() {
    this._score = 0;
  }
}

// ギャンブルゲームのPlayer
export abstract class GamblePlayer extends VanilaPlayer {
  private _chips: number;
  private _bet: number;

  constructor(
    id: number,
    name: string,
    hand: Card[],
    chips: number,
    bet: number
  ) {
    super(id, name, hand);
    this.id = id;
    this.name = name;
    this.hand = hand;
    this._chips = chips;
    this._bet = bet;
  }

  public get chips(): number {
    return this._chips;
  }

  protected set chips(v: number) {
    this._chips = v;
  }

  // chipを特定の額追加する
  protected incrementChips(value: number) {
    const cur = this._chips;
    this._chips = cur + value;
  }

  // 引数のvalue分だけChipをマイナスするメソッド
  protected decrementChips(value: number) {
    const cur = this._chips;
    this._chips = cur - value;
  }

  // 引数のvalue分Chipをマイナスできるか（０以下にならないか）
  protected isAbleToDecrementChips(value: number): boolean {
    return this.chips >= value;
  }

  public get bet(): number {
    return this._bet;
  }

  protected set bet(v: number) {
    this._bet = v;
  }

  // betを特定額増やす関数
  // protected incrementBet(value: number) {
  //   const cur = this._bet;
  //   this.bet = cur + value;
  // };

  // bet額に十分なChipがあるかboolで返す
  public isAbleToBet(bet: number) {
    return this.chips >= bet;
  }

  // userのbetをセットする関数
  abstract setUserBet(bet: number): void;

  // AIのBETロジックを内包、AIにベットをさせる関数
  abstract makeAIInitialBet(): void;

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
