import { gameInfoWar, gameInfoBlackJack } from "./../gameInfo/gameInfo";
import { Deck } from "../deck/deck";
import { GameInfo } from "../gameInfo/gameInfo";
import {
  AbstractPokerTable,
  GambleTable,
  VanilaTable,
  TurnGameTable,
} from "./abstractTable";
// ターンの概念が無いゲーム
export class WarTable extends VanilaTable {
  gameInfo: GameInfo = gameInfoWar;
}

export class SpeedTable extends VanilaTable {}

// ターンの概念があり、賭け金がいらないゲーム
export class RummyTable extends TurnGameTable {}

// ターンの概念があり、賭け金を要するゲーム
export class BlackjackTable extends GambleTable {
  gameInfo: GameInfo = gameInfoBlackJack;
}

// ポーカー系のゲーム
export class PokerTable extends AbstractPokerTable {}

export class TexasPokerTable extends AbstractPokerTable {}
