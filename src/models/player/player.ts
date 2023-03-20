import { AbstractPokerPlayer, GambleDealer, GamblePlayer, ScoreGamePlayer, VanilaPlayer } from "./abstractPlayer";

// 基本的なVanilaPlayerクラスから拡張した、手札スコア制でもギャンブルでもないゲームのPlayerクラス
export class SpeedPlayer extends VanilaPlayer{

};

// スコア制のゲームのプレイヤー(ギャンブルではないプレイヤー)
export class RummyPlayer extends ScoreGamePlayer {

};

export class WarPlayer extends ScoreGamePlayer {

};

// チップをベットするゲームのプレイヤー
export class BlackjackPlayer extends GamblePlayer {

};

// チップをベットする系のゲームのディーラー
export class BlackjackDealer extends GambleDealer {

};

// ギャンブル系の中でも、ポーカー系のゲームのプレイヤー
export class PokerPlayer extends AbstractPokerPlayer{

};

export class TexasPokerPlayer extends AbstractPokerPlayer {

};




