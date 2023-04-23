import { BlackjackPlayerStatus } from "./../playerStatus/playerStatus";
import { Card } from "./../card/card";
import { VanilaPlayer } from "@/models/player/abstractPlayer";
// 基本的なVanilaPlayerクラスから拡張した、手札スコア制でもギャンブルでもないゲームのPlayerクラス
export class SpeedPlayer extends VanilaPlayer {
  _result: string = "";
  _playerStatus: string = "";
  _playerType: string = "";
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
  constructor(
    id: number,
    name: string,
    playerType: string,
    playerStatus: string,
    hand: Card[]
  ) {
    super(id, name, hand);
    this.id = id;
    this.name = name;
    this.hand = [];
    this.setPlayerTypeAndStatus(playerType, playerStatus);
  }

  public setPlayerTypeAndStatus(playerType: string, playerStatus: string) {
    this._playerType = playerType;
    this._playerStatus = playerStatus;
  }

  public initForNewGame() {
    this.hand = [];
    //   this.playerStatus = BlackjackPlayerStatus.bet;
  }
}
