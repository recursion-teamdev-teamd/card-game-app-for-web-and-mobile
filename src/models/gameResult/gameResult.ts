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

export class BlackJackGameResult extends GameResult {
  static readonly push: string = "push";
}
