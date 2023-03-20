// 全てのPlayerの基盤となる抽象クラス
export abstract class VanilaPlayer {

};

// スコア制ゲームのPlayer
export abstract class ScoreGamePlayer extends VanilaPlayer {

};

// ギャンブルゲームのPlayer
export abstract class GamblePlayer extends VanilaPlayer {

};
// ギャンブルゲームのディーラー
export abstract class GambleDealer extends VanilaPlayer {

}

// ギャンブルの中でも、各種ポーカーのプレイヤー
export abstract class AbstractPokerPlayer extends GamblePlayer {

}