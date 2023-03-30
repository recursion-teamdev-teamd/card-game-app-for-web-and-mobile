export class PlayerStatus {
  static readonly roundOver: string = "roundOver";
}

export class BlackJackPlayerStatus extends PlayerStatus {
  static readonly bet: string = "bet";
  static readonly double: string = "double";
  static readonly hit: string = "hit";
  static readonly stand: string = "stand";
  static readonly waiting: string = "waiting";
}
