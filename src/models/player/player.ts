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

// チップをベットするゲームのプレイヤー

// ギャンブル系の中でも、ポーカー系のゲームのプレイヤー
export class PokerPlayer extends AbstractPokerPlayer {}

export class TexasPokerPlayer extends AbstractPokerPlayer {}
