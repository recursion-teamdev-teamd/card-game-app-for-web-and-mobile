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
export class BlackjackTable extends GambleTable {}

// ポーカー系のゲーム
export class PokerTable extends AbstractPokerTable {}

export class TexasPokerTable extends AbstractPokerTable {}