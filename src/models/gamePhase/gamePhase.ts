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
