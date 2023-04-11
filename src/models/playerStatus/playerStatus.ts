export class PlayerStatus {
  static readonly roundOver: string = "roundOver";
}

export type BlackjackPlayerStatus =
  | "Waiting"
  | "Playing"
  | "Betting"
  | "Hit"
  | "Stand"
  | "Double"
  | "Surrender"
  | "Bust"
  | "DoubleBust"
  | "Game Over";

export type SpeedPlayerStatus = "roundOver" | "acting";
