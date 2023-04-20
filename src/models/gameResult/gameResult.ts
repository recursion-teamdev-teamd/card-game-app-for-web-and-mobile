/*使用方法
GameResultクラスはTableのプロパティの_gameResultに対応してます。
例えばWarTable.gameResultに格納する値はWarGameResultから選ぶことになります。
example
let warTable = new WarGameTable();
warTable.gameResult = WarGameResult.win;
*/

export class GameResult {
  static readonly yetDecided: string = "yetDecided";
  static readonly win: string = "win";
  static readonly lose: string = "lose";
}

export class WarGameResult extends GameResult {
  static readonly draw: string = "draw";
}

export type VanilaGameResult =
  | "Win"
  | "Lose"
  | "Draw"
  | "YetDecided"
  | "Game Over";

export type BlackjackGameResult =
  | "Win"
  | "Lose"
  | "Draw"
  | "YetDecided"
  | "Game Over";

export type SpeedGameResult = "win" | "lose" | "yetDecided";
