/*使用方法
GamePhaseクラスはTableのプロパティの_gamePhaseに対応してます。
例えばWarTable.gamePhaseに格納する値はWarGamePhaseから選ぶことになります。
example
let warTable = new WarGameTable();
warTable.gamePhase = warGamePhase.betting
*/
export abstract class GamePhase {
  static readonly roundOver: string = "roundOver";
}

export class GambleGamePhase extends GamePhase {
  static readonly betting: string = "betting";
  static readonly acting: string = "acting";
}
export class ScoreGamePhase extends GamePhase {
  static readonly acting: string = "acting";
}

export type BlackjackGamePhase =
  | "Betting"
  | "PlayerAction"
  | "HouseAction"
  | "Result";
