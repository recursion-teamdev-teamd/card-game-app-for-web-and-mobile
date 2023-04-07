// export class BlackJackPlayerType extends PlayerType {
//   static readonly AI: string = "AI";
//   static readonly HOUSE: string = "HOUSE";
// }

export type VanilaPlayerType = "USER" | "AI";

export type BlackjackPlayerType = VanilaPlayerType | "HOUSE";
