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
export class SpeedPlayer extends VanilaPlayer {}

// スコア制のゲームのプレイヤー(ギャンブルではないプレイヤー)

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

// ギャンブル系の中でも、ポーカー系のゲームのプレイヤー
export class PokerPlayer extends AbstractPokerPlayer {}

export class TexasPokerPlayer extends AbstractPokerPlayer {}
