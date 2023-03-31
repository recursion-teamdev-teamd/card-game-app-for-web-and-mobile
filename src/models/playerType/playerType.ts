export class PlayerType {
  static readonly USER: string = "USER";
}

export class BlackJackPlayerType extends PlayerType {
  static readonly AI: string = "AI";
  static readonly HOUSE: string = "HOUSE";
}
