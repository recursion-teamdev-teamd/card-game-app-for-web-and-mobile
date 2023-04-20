import { Card } from "@/models/card/card";
import { RummyPlayer } from "./../player/rummyPlayer";
import { gameInfoRummy } from "./../gameInfo/gameInfo";

import { Deck } from "../deck/deck";
import { GameInfo } from "../gameInfo/gameInfo";

import { TurnGameTable } from "./abstractTable";
import { VanilaGameResult } from "../gameResult/gameResult";
import { VanilaGamePhase } from "../gamePhase/gamePhase";

export class RummyTable extends TurnGameTable {
  protected _deck: Deck;
  protected _gameResult: VanilaGameResult = "YetDecided";
  protected _gamePhase: VanilaGamePhase = "PlayerAction";
  protected _user: RummyPlayer;
  protected _players: RummyPlayer[];
  protected _gameInfo: GameInfo = gameInfoRummy;
  protected _meldArea: Card[][] = [];
  protected _discardArea: Card[] = [];
  protected _round: number = 0;

  constructor() {
    super();
    this._deck = new Deck(gameInfoRummy);
    this._user = RummyPlayer.createUserPlayer();
    this._players = [
      RummyPlayer.createRandomAIPlayer(),
      RummyPlayer.createRandomAIPlayer(),
      RummyPlayer.createRandomAIPlayer(),
    ];
    this._players.push(this._user);
  }

  public get user(): RummyPlayer {
    return this._user;
  }
  protected set user(v: RummyPlayer) {
    this._user = v;
  }
  public get players(): RummyPlayer[] {
    return this._players;
  }
  protected set players(players: RummyPlayer[]) {
    this._players = players;
  }
  public get gameResult() {
    return this._gameResult;
  }
  public set gameResult(gameResult: VanilaGameResult) {
    this._gameResult = gameResult;
  }
  public get gamePhase(): VanilaGamePhase {
    return this._gamePhase;
  }
  public set gamePhase(gamePhase: VanilaGamePhase) {
    this._gamePhase = gamePhase;
  }

  public get meldArea() {
    return this._meldArea;
  }

  protected set meldArea(v: Card[][]) {
    this._meldArea = v;
  }

  public get discardArea() {
    return this._discardArea;
  }

  protected set discardArea(v: Card[]) {
    this._discardArea = v;
  }

  public get round() {
    return this._round;
  }

  protected set round(v: number) {
    this._round = v;
  }

  public getPlayerOnTurn(): RummyPlayer {
    return this.players[this.turnCounter];
  }

  public assignPlayersHand(): void {
    for (let player of this.players) {
      if (player.hand.length !== 0) player.resetHand();
      for (let i = 0; i < this._gameInfo.initialHand; i++) {
        let card = this._deck.drawOne();
        if (card) {
          player.playerType === "USER" && card.open();
          player.addACardToHand(card);
        }
      }
    }
  }

  // 初期化関連

  // 新しいラウンド
  public initForNewRound() {
    this._round = this._round + 1;
    this.deck.resetDeck();
    this.deck.shuffleDeck();
    if (this._meldArea.length > 0) this._meldArea = [];
    if (this._discardArea.length > 0) this._discardArea = [];
    const card = this.deck.drawOne();
    card && this.pushToDisCardArea(card);
  }

  // 新しいゲーム
  public initForNewGame() {
    this._round = 0;
    for (const player of this.players) player.resetScoreToZero();
    this.initForNewRound();
  }

  //   捨て札関連

  // 捨て札にプッシュ
  public pushToDisCardArea(card: Card) {
    this._discardArea.push(card);
  }
  // 捨て札の頂点の値取得
  public peekOfDiscardArea() {
    const card = this._discardArea[0];
    if (card) card.open();
    return card;
  }

  // 捨て札からカード取得
  public popFromDisCardArea() {
    return this._discardArea.pop();
  }

  //   メルド関係
  public pushToMeldArea(cards: Card[]) {
    this._meldArea.push(cards);
  }

  //メルドゾーンのペアにくっつけられるか

  //手札のカードとメルドエリアのペアが同じランクで連結できるか
  public isAbleToConnectWithSameRank(pairOnMeld: Card[], cardOnHand: Card) {
    return pairOnMeld[0].rank === cardOnHand.rank;
  }

  // 手札のカードとメルドエリアのペアが連番で連結できるか
  public isAbleToConnectACardConsecutively(
    pairOnMeld: Card[],
    cardOnHand: Card
  ) {
    const head = pairOnMeld[0];
    const tail = pairOnMeld[pairOnMeld.length - 1];

    if (head.suit !== cardOnHand.suit) return false;

    return (
      head.getRankNumber() === cardOnHand.getRankNumber() + 1 ||
      tail.getRankNumber() === cardOnHand.getRankNumber() - 1
    );
  }

  //
  public isAbleToConnectAPairConsecutively(
    pairOnMeld: Card[],
    pairOnHand: Card[]
  ) {
    const meldHead = pairOnMeld[0];
    const meldTail = pairOnMeld[pairOnMeld.length - 1];
    const handHead = pairOnHand[0];
    const handTail = pairOnHand[pairOnHand.length - 1];

    if (meldHead.suit !== handHead.suit) return false;

    return (
      meldHead.getRankNumber() === handTail.getRankNumber() + 1 ||
      meldTail.getRankNumber() === handHead.getRankNumber() - 1
    );
  }

  public connectWithSameRank(pairOnMeld: Card[], cardOnHand: Card) {
    const newArr = pairOnMeld;
    newArr.push(cardOnHand);
    return newArr;
  }

  public connectACardConsecutively(pairOnMeld: Card[], cardOnHand: Card) {
    const meldHead = pairOnMeld[0];

    return meldHead.getRankNumber() > cardOnHand.getRankNumber()
      ? [cardOnHand, ...pairOnMeld]
      : [...pairOnMeld, cardOnHand];
  }
  public connectAPairConsecutively(pairOnMeld: Card[], pairOnHand: Card[]) {
    const meldHead = pairOnMeld[0];
    const handTail = pairOnHand[pairOnHand.length - 1];

    return meldHead.getRankNumber() > handTail.getRankNumber()
      ? [...pairOnHand, ...pairOnMeld]
      : [...pairOnMeld, ...pairOnHand];
  }

  // 捨て札から取るべきかチェック
  public isCompatibleWithDiscardArea(player: RummyPlayer) {
    const card = this.peekOfDiscardArea();
    const rank = card.rank;
    // 一枚でもランクでペアになるカードがあれば出す
    for (let handCard of player.hand) if (rank === handCard.rank) return true;
    return false;
  }

  // ターンの最初に、捨て札か山札どちらからかカードを引く関数
  public aiActionDrawACard(player: RummyPlayer) {
    // 捨て札から取ったらペアになる時
    if (this.isCompatibleWithDiscardArea(player)) {
      const card = this.popFromDisCardArea();
      card && player.addACardToHand(card);
    }
    // 山札から取る時
    else {
      const card = this.deck.drawOne();
      card && player.addACardToHand(card);
    }
  }

  public isAbleToAiActionMeld(player: RummyPlayer): boolean {
    const sameRankPairIndexes = player.getSameRankPairIndexes();
    const consecutivePairIndexes = player.getConsecutivePairIndexes();
    return (
      sameRankPairIndexes.length === 0 || consecutivePairIndexes.length === 0
    );
  }

  // 再帰でメルドし続ける
  public aiActionMeld(player: RummyPlayer): void {
    console.log("aiActionMeld");
    // 同じランクのカード三枚以上があれば
    const sameRankPairIndexes = player.getSameRankPairIndexes();
    const consecutivePairIndexes = player.getConsecutivePairIndexes();
    if (this.isAbleToAiActionMeld(player)) {
      // ペアの配列の長さが2以上であればペアがあることを意味する
      if (sameRankPairIndexes.length > 2) {
        const sameRankPair = player.popAPairFromHands(sameRankPairIndexes);
        console.log(sameRankPair);
        this.pushToMeldArea(sameRankPair);
      }

      // ペアの配列の長さが2以上であればペアがあることを意味する
      if (consecutivePairIndexes.length > 2) {
        const consecutivePair = player.popAPairFromHands(
          consecutivePairIndexes
        );
        // メルドエリアの既存ペアにくっつけられるかチェック
        for (let i = 0; i < this.meldArea.length; i++) {
          // くっつけられる場合はin-placeでくっつけた新しいカード配列をメルドエリアに差し込める
          if (
            this.isAbleToConnectAPairConsecutively(
              this.meldArea[i],
              consecutivePair
            )
          ) {
            const newPair = this.connectAPairConsecutively(
              this.meldArea[i],
              consecutivePair
            );
            this.meldArea[i] = newPair;
            // 新規メルドはせずに処理終了
            return this.aiActionMeld(player);
          }
        }
        this.pushToMeldArea(consecutivePair);
      }
      return this.aiActionMeld(player);
    } else return;
  }

  public aiActionAddToExsitingPair(player: RummyPlayer) {
    for (let i = 0; i < player.hand.length; i++) {
      const currentCard = player.hand[i];
      for (let j = 0; j < this.meldArea.length; j++) {
        const currentPair = this.meldArea[j];
        if (this.isAbleToConnectWithSameRank(currentPair, currentCard))
          this.connectWithSameRank(currentPair, currentCard);
        else if (
          this.isAbleToConnectACardConsecutively(currentPair, currentCard)
        )
          this.connectACardConsecutively(currentPair, currentCard);
      }
    }
  }

  // 捨て札を選んで捨てる関数
  public aiActionDiscard(player: RummyPlayer) {
    const card = player.aiDiscard();
    card && this.pushToDisCardArea(card);
  }

  public setScoreForAllPlayers() {
    for (const player of this.players) player.decideScore();
  }

  public isGameOver() {
    for (const player of this.players) {
      if (player.score <= -100) return true;
    }
    return true;
  }

  public setResultForAllPlayers() {
    let curWinner = 0;
    for (let i = 1; i < this.players.length; i++) {
      if (this.players[curWinner].score < this.players[i].score) curWinner = i;
    }
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].result = i === curWinner ? "Win" : "Lose";
    }
  }
}
