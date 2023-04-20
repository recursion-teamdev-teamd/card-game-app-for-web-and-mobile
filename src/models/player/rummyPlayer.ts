import { VanilaGameResult } from "./../gameResult/gameResult";
import { VanilaPlayerType } from "./../playerType/playerType";
import { Card } from "@/models/card/card";
import { ScoreGamePlayer } from "./abstractPlayer";
import { VanilaPlayerStatus } from "../playerStatus/playerStatus";

export class RummyPlayer extends ScoreGamePlayer {
  protected _result: VanilaGameResult = "YetDecided";
  protected _playerStatus: VanilaPlayerStatus = "Playing";
  protected _playerType: VanilaPlayerType;

  constructor(
    id: number,
    name: string,
    hand: Card[],
    score: number,
    playerType: VanilaPlayerType
  ) {
    super(id, name, hand, score);
    this._playerType = playerType;
  }

  static createUserPlayer() {
    return new RummyPlayer(
      Math.floor(Math.random() * 100),
      "User",
      [],
      0,
      "USER"
    );
  }

  static createRandomAIPlayer() {
    const id = Math.floor(Math.random() * 100);
    const name =
      this.cpuNamePatterns[
        Math.floor(Math.random() * this.cpuNamePatterns.length)
      ];
    return new RummyPlayer(id, name, [], 0, "AI");
  }
  get playerType(): VanilaPlayerType {
    return this._playerType;
  }
  get playerStatus(): VanilaPlayerStatus {
    return this._playerStatus;
  }
  protected set playerStatus(v: VanilaPlayerStatus) {
    this.playerStatus = v;
  }
  public set result(v: VanilaGameResult) {
    this._result = v;
  }
  public get result(): VanilaGameResult {
    return this._result;
  }

  // hand関連

  // カードを手札に加える（sortの位置に挿入する）
  public insertACardToHand(card: Card): void {
    let index = 0;
    while (
      index < this.hand.length &&
      this.hand[index].getRankNumber() < card.getRankNumber()
    ) {
      index++;
    }
    this.hand.splice(index, 0, card);
  }

  // 捨て札にするカードを選んで返す
  public aiDiscard() {
    let index = this.hand.length - 1;
    if (index === 0) return this.popACardFromHand(0);
    else if (this.getACardFromHand(index) !== this.getACardFromHand(index - 1))
      return this.popACardFromHand(index);
    else {
      while (index < 0) {
        index--;
        if (
          this.getACardFromHand(index) !== this.getACardFromHand(index - 1) &&
          this.getACardFromHand(index) !== this.getACardFromHand(index + 1)
        ) {
          return this.popACardFromHand(index);
        }
      }
    }
  }

  // メルド関連

  // メルドできるか
  public isAbleToMeld() {
    if (this.hand.length < 3) return false;
    if (this.getSameRankPairIndexes().length < 3) return false;
    if (this.getConsecutivePairIndexes().length < 3) return false;
    else return true;
  }
  // 手札内の同じランクのペアのインデックスを返す
  public getSameRankPairIndexes() {
    let arr = [];
    for (let i = 0; i < this.hand.length; i++) {
      const cur = this.getACardFromHand(i);
      for (let j = i + 1; j < this.hand.length - 1; j++) {
        if (cur.rank === this.getACardFromHand(j).rank) arr.push(j);
      }
      if (arr.length > 2) {
        arr.push(i);
        break;
      }
    }
    return arr;
  }

  // 手札内のランクが３連続以上、スートが全て同じになっているペアのインデックスを返す
  public getConsecutivePairIndexes() {
    let arr = [];
    for (let i = 0; i < this.hand.length; i++) {
      const cur1 = this.getACardFromHand(i);
      for (let j = i + 1; j < this.hand.length - 1; j++) {
        const cur2 = this.getACardFromHand(j);
        if (cur1.getRankNumber() === cur2.getRankNumber() - 1) {
          cur1.suit === cur2.suit && arr.push(j);
        }
      }
      if (arr.length > 2) {
        arr.push(i);
        break;
      }
    }
    return arr;
  }

  // インデックスの配列を受け取り、そのインデックスのカードを手札から取り出して配列で返す
  public popAPairFromHands(indexes: number[]) {
    const pairs: Card[] = [];
    // インデックスを降順にしておく
    indexes.sort((a, b) => b - a);

    for (const index of indexes) {
      const card = this.getACardFromHand(index);
      pairs.push(card);
    }
    Card.sortCards(pairs);
    return pairs;
  }

  // スコア関連

  // scoreを換算して返す
  public decideScore() {
    let score = 0;
    for (let card of this.hand) {
      score -= card.getRankNumberInRummy();
    }
    this.decrementScore(score);
  }
  // ラウンド終了か確認
  public isRoundOver() {
    return this.hand.length === 0;
  }
  // ゲームオーバーか判定
  public isGameOver() {
    return this.score < -100;
  }
  public isAbleToRummy() {}
}
