import { Card } from "@/models/card/card";
// スコア制のゲームのプレイヤー(ギャンブルではないプレイヤー)

import { ScoreGamePlayer } from "./abstractPlayer";

export class WarPlayer extends ScoreGamePlayer {
  _result: "Win" | "Lose" | "Draw" | "YetDecided" = "YetDecided";
  _playerType: "user" | "cpu";
  _playerStatus: string;
  _selectedCard: Card | null = null;
  _obtainedCards: Card[] = [];
  constructor(
    id: number,
    name: string,
    playerType: "user" | "cpu",
    hand: Card[],
    score: number
  ) {
    super(id, name, hand, score);
    this._playerType = playerType;
    this._playerStatus = "";
  }

  // 初期化
  public initForNewGame() {
    this.score = 0;
    this.selectedCard = null;
  }

  // ランダムにカードを取り出す
  public cpuSelectCard() {
    const index = Math.floor(Math.random() * this.hand.length);
    const card = this.hand[index];
    this.removeACardFromHand(index);
    card.open();
    this.selectedCard = card;
  }

  // 特定のインデックスのカードを取り出す
  public userSelectCard(index: number) {
    const card = this.hand[index];
    this.removeACardFromHand(index);
    card.open();
    this.selectedCard = card;
  }
  public obtainCard(card: Card) {
    this._obtainedCards.push(card);
  }

  public peekOfObtainedCards() {
    return this._obtainedCards[this._obtainedCards.length - 1];
  }

  public get selectedCard(): Card | null {
    return this._selectedCard;
  }
  public set selectedCard(card: Card | null) {
    this._selectedCard = card;
  }
  get playerType(): string {
    throw new Error("Method not implemented.");
  }
  get playerStatus(): string {
    throw new Error("Method not implemented.");
  }
  set playerStatus(v: string) {
    throw new Error("Method not implemented.");
  }
  set result(v: string) {
    throw new Error("Method not implemented.");
  }
  get result(): string {
    throw new Error("Method not implemented.");
  }
}
