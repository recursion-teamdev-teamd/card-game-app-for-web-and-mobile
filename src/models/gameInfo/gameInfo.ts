// ゲームの基本的な情報を網羅したインターフェース。新しいゲームを開発する際はここにまず情報を定義する。
// 新しいゲームを定義したらgameInfoArrayに定義したゲームを追加する

export interface GameInfo {
    readonly gameName: string;
    readonly gameDescriptionUrl: string;
    readonly playerNum: number;
    readonly isCardOpen: boolean; // カードが最初の時点で表向きかどうか
    readonly jokerNum: number;
    readonly initialHand: number;
    readonly initialHouseHand: number;
  };
  
  export const gameInfoBlackJack: GameInfo = {
    gameName: "Blackpjack",
    gameDescriptionUrl:
      "https://en.wikipedia.org/wiki/Blackjack#Rules_of_play_at_casinos",
    playerNum: 3,
    isCardOpen: true,
    jokerNum: 0,
    initialHand: 2,
    initialHouseHand: 1,
  };
//   ゲームの情報を
  export const gameInfoArray: GameInfo[] = [gameInfoBlackJack];


  