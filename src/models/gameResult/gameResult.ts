export class GameResult {
  readonly win: string = "win";
  readonly lose: string = "lose";
}

export class WarGameResult extends GameResult {
  readonly draw: string = "draw";
}

export class BlackJackGameResult extends GameResult {
  readonly push: string = "push";
}
