export abstract class GamePhase {
  static roundOver: string = "roundOver";
}

export class GambleGamePhase extends GamePhase {
  static betting: string = "betting";
  static acting: string = "acting";
}
export class ScoreGamePhase extends GamePhase {
  static acting: string = "acting";
}
