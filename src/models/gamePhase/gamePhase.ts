export abstract class GamePhase {
  readonly roundOver: string = "roundOver";
}

export class GambleGamePhase extends GamePhase {
  readonly betting: string = "betting";
  readonly acting: string = "acting";
}
export class ScoreGamePhase extends GamePhase {
  readonly acting: string = "acting";
}
