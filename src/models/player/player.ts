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

export class WarPlayer extends ScoreGamePlayer {
  _result: "Win" | "Lose" | "Draw" | "YetDecided" = "YetDecided";
  _playerType: "user" | "cpu";
  _playerStatus: string;
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
    this._playerStatus = "";
  }

  // 初期化
  public initForNewGame() {
    this.score = 0;
    this.selectedCard = null;
  }

  // ランダムにカードを取り出す
  public cpuSelectCard() {
    const index = Math.floor(Math.random() * 26);
    const card = this.hand[index];
    this.hand.splice(index, 1);
    this.selectedCard = card;
  }

  // 特定のインデックスのカードを取り出す
  public userSelectCard(index: number) {
    const card = this.hand[index];
    this.hand.splice(index, 1);
    this.selectedCard = card;
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

// チップをベットするゲームのプレイヤー

// ギャンブル系の中でも、ポーカー系のゲームのプレイヤー
export class PokerPlayer extends AbstractPokerPlayer {}

export class TexasPokerPlayer extends AbstractPokerPlayer {}
