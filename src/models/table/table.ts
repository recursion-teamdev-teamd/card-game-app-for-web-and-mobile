import { gameInfoWar, gameInfoBlackJack } from "./../gameInfo/gameInfo";
import { Deck } from "../deck/deck";
import { GameInfo } from "../gameInfo/gameInfo";
import { BlackjackPlayer } from "../player/player";
import { BlackJackPlayerStatus } from "../playerStatus/playerStatus";
import {
  AbstractPokerTable,
  GambleTable,
  VanilaTable,
  TurnGameTable,
} from "./abstractTable";
// ターンの概念が無いゲーム
export class WarTable extends VanilaTable {}

export class SpeedTable extends VanilaTable {}

// ターンの概念があり、賭け金がいらないゲーム
export class RummyTable extends TurnGameTable {}

// ターンの概念があり、賭け金を要するゲーム
export class BlackjackTable extends GambleTable {
  private _gameInfo: GameInfo = gameInfoBlackJack;
  private _house: BlackjackPlayer;

  constructor(deck: Deck, players: BlackjackPlayer[]) {
    super();
    this.deck = new Deck(this.gameInfo);
  }
  public get gameInfo() {
    return this._gameInfo;
  }
}

// ポーカー系のゲーム
export class PokerTable extends AbstractPokerTable {}

export class TexasPokerTable extends AbstractPokerTable {}
