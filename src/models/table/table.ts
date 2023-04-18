import { gameInfoWar, gameInfoBlackJack } from "./../gameInfo/gameInfo";
import { BlackjackGameResult } from "../gameResult/gameResult";
import { BlackjackGamePhase, GambleGamePhase } from "../gamePhase/gamePhase";
import { BlackjackPlayerStatus } from "../playerStatus/playerStatus";
import { GamblePlayer, VanilaPlayer } from "../player/abstractPlayer";
import { BlackjackPlayerType } from "../playerType/playerType";
import { Deck } from "../deck/deck";
import { GameInfo } from "../gameInfo/gameInfo";
import { WarPlayer } from "../player/player";
import {
  AbstractPokerTable,
  GambleTable,
  VanilaTable,
  TurnGameTable,
} from "./abstractTable";

import { Card } from "../card/card";

// ターンの概念が無いゲーム
export class WarTable extends VanilaTable {
  private _gameInfo: GameInfo = gameInfoWar;
  private stock: number = 2;
  private _players: WarPlayer[] = [];
  private _cpu: WarPlayer = new WarPlayer(0, "CPU", "cpu", [], 0);
  private _user: WarPlayer;
  constructor(userName: string) {
    super();
    this.deck = new Deck(this.gameInfo);
    this._user = new WarPlayer(0, userName, "user", [], 0);
    this.players = [this.cpu, this.user];
  }

  // カードを選択する

  // 場に出たカードの比較
  public compareCard() {
    const cpu = this.cpu;
    const user = this.user;
    const cpuCard = this.getRankNumber(cpu.selectedCard);
    const userCard = this.getRankNumber(user.selectedCard);

    if (userCard == cpuCard) {
      this.stock += 2;
    } else if (userCard > cpuCard) {
      user.score += this.stock;
    } else if (userCard < cpuCard) {
      cpu.score += this.stock;
    }
  }

  public splitHalfOfDeck(player: WarPlayer) {
    this.deck.resetDeck();
    this.deck.shuffleDeck();
    for (let i = 0; i < 26; i++) {
      player.hand.push(this.deck.drawOne()!);
      player.hand.push(this.deck.drawOne()!);
    }
  }

  public getRankNumber(card: Card) {
    const rank = card.rank;
    if (rank === "A") {
      return 1;
    } else if (rank === "J") {
      return 11;
    } else if (rank === "Q") {
      return 12;
    } else if (rank === "K") {
      return 13;
    } else {
      return parseInt(rank);
    }
  }

  public get gameInfo() {
    return this._gameInfo;
  }
  public get players(): WarPlayer[] {
    return this._players;
  }
  public set players(v: WarPlayer[]) {
    this._players = v;
  }
  public get cpu(): WarPlayer {
    return this._cpu;
  }
  public set cpu(v: WarPlayer) {
    this._cpu = v;
  }
  public get user(): WarPlayer {
    return this._user;
  }
  public set user(v: WarPlayer) {
    this._user = v;
  }
}

export class SpeedTable extends VanilaTable {}

// ポーカー系のゲーム
export class PokerTable extends AbstractPokerTable {}

export class TexasPokerTable extends AbstractPokerTable {}
