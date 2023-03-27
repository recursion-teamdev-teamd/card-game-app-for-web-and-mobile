export class GameResult {
  static readonly win: string = "win";
  static readonly lose: string = "lose";
}

export class WarGameResult extends GameResult {
  static readonly draw: string = "draw";
}

export class BlackJackGameResult extends GameResult {
  static readonly push: string = "push";
}
