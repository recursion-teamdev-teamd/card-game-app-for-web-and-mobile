// ゲームの基本的な情報を網羅したインターフェース。新しいゲームを開発する際はここにまず情報を定義する。
// 新しいゲームを定義したらgameInfoArrayに定義したゲームを追加する

export interface GameInfo {
  readonly nameEn: string;
  readonly nameJa: string;
  readonly descriptionJa: string;
  readonly descriptionEn: string;
  readonly playerNum: number;
  readonly isCardOpen: boolean; // カードが最初の時点で表向きかどうか
  readonly jokerNum: number;
  readonly initialHand: number;
  readonly initialHouseHand: number;
}
// ブラックジャック
export const gameInfoBlackJack: GameInfo = {
  nameEn: "Blackjack",
  nameJa: "ブラックジャック",
  descriptionJa:
    "手札の合計値を21に近づけるゲームです。21を超えないように気をつけましょう。",
  descriptionEn: "",
  playerNum: 3,
  isCardOpen: true,
  jokerNum: 0,
  initialHand: 2,
  initialHouseHand: 1,
};

export const gameInfoWar: GameInfo = {
  nameEn: "War",
  nameJa: "戦争",
  descriptionJa: "相手のカードよりも強いカードを出すと勝つゲームです。運ゲー？",
  descriptionEn: "",
  playerNum: 2,
  isCardOpen: false,
  jokerNum: 0,
  initialHand: 26,
  initialHouseHand: 0,
};

export const gameInfoRummy: GameInfo = {
  nameEn: "Rummy",
  nameJa: "ラミー",
  descriptionJa:
    "連続した数字のカードを揃えるゲームです。頭を使いましょう。記憶力も大事です。",
  descriptionEn: "",
  playerNum: 4,
  isCardOpen: false,
  jokerNum: 0,
  initialHand: 26,
  initialHouseHand: 0,
};

export const gameInfoSpeed: GameInfo = {
  nameEn: "Speed",
  nameJa: "スピード",
  descriptionJa:
    "手札から素早く台札の上にカードを乗せるゲームです。相手より早く手札をなくしましょう。",
  descriptionEn: "",
  playerNum: 2,
  isCardOpen: true,
  jokerNum: 0,
  initialHand: 26,
  initialHouseHand: 0,
};

export const gameInfoPoker: GameInfo = {
  nameEn: "Poker",
  nameJa: "ポーカー",
  descriptionJa:
    "5枚の手札で役を作るゲームです。どのような役で勝負するかはあなた次第です。",
  descriptionEn: "",
  playerNum: 2,
  isCardOpen: true,
  jokerNum: 0,
  initialHand: 26,
  initialHouseHand: 0,
};

export const gameInfoTexasHoldemPoker: GameInfo = {
  nameEn: "Texas Holdem Poker",
  nameJa: "テキサスポーカー",
  descriptionJa:
    "自分の手札とディーラーの手札の組み合わせで役を作るゲームです。ただの運ゲーではありません。",
  descriptionEn: "",
  playerNum: 2,
  isCardOpen: true,
  jokerNum: 0,
  initialHand: 26,
  initialHouseHand: 0,
};

//   ゲームの情報を
export const gameInfoArray: GameInfo[] = [
  gameInfoBlackJack,
  gameInfoWar,
  gameInfoRummy,
  gameInfoSpeed,
  gameInfoPoker,
  gameInfoTexasHoldemPoker,
];
