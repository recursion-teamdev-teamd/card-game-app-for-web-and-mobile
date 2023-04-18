import { BlackjackGameResult } from "./../gameResult/gameResult";
import { BlackjackGamePhase } from "@/models/gamePhase/gamePhase";
import { Deck } from "./../deck/deck";
import { GameInfo, gameInfoBlackJack } from "./../gameInfo/gameInfo";
import { GambleTable } from "./abstractTable";
import { BlackjackPlayer } from "../player/blackjackPlayer";

export class BlackjackTable extends GambleTable {
  readonly _gameInfo: GameInfo = gameInfoBlackJack;

  protected _betDenominations: number[] = [];
  protected _deck: Deck;
  protected _gamePhase: BlackjackGamePhase;
  protected _gameResult: BlackjackGameResult;
  protected _user: BlackjackPlayer = new BlackjackPlayer(
    2,
    "You",
    [],
    200,
    0,
    "USER",
    "Betting"
  );
  protected _players: BlackjackPlayer[];
  protected _house: BlackjackPlayer;

  constructor() {
    super();
    this._deck = new Deck(this.gameInfo);

    this._house = new BlackjackPlayer(
      0,
      "House",
      [],
      200,
      0,
      "HOUSE",
      "Waiting"
    );
    this._players = [
      new BlackjackPlayer(1, "AI1", [], 200, 0, "AI", "Betting"),
      this._user,
      new BlackjackPlayer(3, "AI2", [], 200, 0, "AI", "Betting"),
    ];
    this._gamePhase = "Betting";
    this._gameResult = "YetDecided";
  }

  // setter,getter
  public get user(): BlackjackPlayer {
    return this._user;
  }
  protected set user(v: BlackjackPlayer) {
    this._user = v;
  }

  public get gamePhase(): BlackjackGamePhase {
    return this._gamePhase;
  }
  protected set gamePhase(gamePhase: BlackjackGamePhase) {
    this._gamePhase = gamePhase;
  }

  public get gameResult(): BlackjackGameResult {
    return this._gameResult;
  }
  public set gameResult(gameResult: BlackjackGameResult) {
    this._gameResult = gameResult;
  }

  public get players(): BlackjackPlayer[] {
    return this._players;
  }
  protected set players(v: BlackjackPlayer[]) {
    this._players = v;
  }
  public get gameInfo() {
    return this._gameInfo;
  }

  public get house(): BlackjackPlayer {
    return this._house;
  }

  // 初期化関連

  // 初期手札を分配
  public assignPlayersHand(): void {
    for (let i = 0; i < this.gameInfo.initialHand; i++) {
      for (let player of this.players) {
        const card = this.deck.drawOne();
        if (card) player.addACardToHand(card);
        else console.error("There aren't any more cards.");
      }
    }
  }
  // houseに初期手札を分配
  public assignHouseHand(): void {
    for (let i = 0; i < this.gameInfo.initialHouseHand; i++) {
      const card = this.deck.drawOne();
      if (card) this.house.addACardToHand(card);
      else console.error("There aren't any more cards.");
    }
  }

  public initForNewGame() {
    this.initDeck();
    for (let player of this.players) player.initForNewGame();
    this.house.initForNewGame();
    this.assignPlayersHand();
    this.assignHouseHand();
  }

  public initDeck() {
    this.deck.resetDeck();
    this.deck.shuffleDeck();
  }

  // playerのアクション関連（ハウスにも使える)
  public setPlayerHit(player: BlackjackPlayer) {
    const card = this.deck.drawOne();
    // カードがundefindedじゃない場合に限りアクション実行
    if (card) player.actionHit(card);
  }

  public setPlayerStand(player: BlackjackPlayer) {
    player.actionStand();
  }

  public setPlayerDouble(player: BlackjackPlayer) {
    const card = this.deck.drawOne();
    // カードがundefindedじゃない場合に限りアクション実行
    if (card) player.actionDouble(card);
  }

  public setPlayerSurrender(player: BlackjackPlayer) {
    player.actionSurrender();
  }
  // AIの判断関連
  // houseのアクション判断ロジック＆実行
  public makeHouseAction() {
    console.log("makeHouseAction");
    while (this.house.getHandScore() < 17) this.setPlayerHit(this.house);
  }
  // public makeHouseAction = (): void => {
  //   console.log("houseAction")
  //   const currentScore = this.house.getHandScore();
  //   const card = this.deck.drawOne();

  //   if (currentScore > 16 || card === undefined) return;
  //   else {
  //     setTimeout(() => {
  //       this.house.addACardToHand(card);
  //       return this.makeHouseAction();
  //     }, 3000);
  //   }
  // };

  // HouseをPlayngにする
  public setHousePlaying() {
    this.house.setHousePlaying();
  }

  // HouseがまだPlay中か判定
  // public isHouseStillPlaying() {
  //   return this.house.isPlayerStillPlaying();
  // }

  // AIPlayerのアクション判断ロジック＆実行 とりあえずある程度チートシートに則った賢いAIのロジック
  public makeAIInitialAction(player: BlackjackPlayer) {
    console.log(`makeAIInitialAction ${player.name}`);
    const curScore = player.getHandScore();
    if (curScore >= 17) this.setPlayerStand(player);
    else if (curScore <= 9) this.setPlayerHit(player);
    else if (curScore === 10 || curScore === 11) this.setPlayerDouble(player);
    else {
      const houseScore = this.house.getHandScore();
      if (houseScore <= 6) this.setPlayerStand(player);
      else this.setPlayerHit(player);
    }
  }

  // 初回以外のアクション。Doubleの処理を抜いただけ
  public makeAIAction(player: BlackjackPlayer) {
    console.log(`makeAIAction ${player.name}`);
    const curScore = player.getHandScore();
    if (curScore >= 17) this.setPlayerStand(player);
    else if (curScore <= 9) this.setPlayerHit(player);
    else {
      const houseScore = this.house.getHandScore();
      if (houseScore <= 6) this.setPlayerStand(player);
      else this.setPlayerHit(player);
    }
  }

  // Bet関連
  // Userがbet可能かを返す関数
  public isUserAbleToBet(bet: number) {
    return this._user.isAbleToBet(bet);
  }

  // userにベットさせる関数
  public setUserBet(bet: number) {
    this._user.setUserBet(bet);
  }
  // UserのBet希望額を受け取って可能であればBetする関数

  // 全てのAIプレイヤーに最初のベットをさせる
  public makeAllAIInitialBet(): void {
    for (let player of this.players) {
      if (player._playerType === "AI") player.makeAIInitialBet();
    }
  }

  // ターン関連
  public getPlayerOnTurn(): BlackjackPlayer {
    return this.players[this.turnCounter];
  }

  // 全てのプレイヤーのアクションが終了しているかどうか
  public isAllPlayerActionDone(): boolean {
    for (let player of this.players) {
      // 一人でもまだプレー中であればfalseを返す
      if (player.isPlayerStillPlaying()) return false;
    }
    return true;
  }

  // result関連

  // player全てのresultを決める
  public setResultForAllPlayer() {
    for (let player of this.players) this.setResultForAPlayer(player);
  }

  // Player一人のresultを決める
  public setResultForAPlayer = (player: BlackjackPlayer): void => {
    const playerStatus = player.playerStatus;
    const houseStatus = this.house.playerStatus;
    const playerBet = player.bet;

    if (playerStatus === "Surrender") {
      player.resultLose(playerBet / 2);
    }
    // PlayerがBustの時
    else if (playerStatus === "Bust" || playerStatus === "DoubleBust") {
      // houseもBustならDraw
      if (houseStatus === "Bust") player.resultDraw();
      else {
        const decrementAmount =
          playerStatus === "Bust" ? playerBet : playerBet * 2;
        player.resultLose(decrementAmount);
      }
    } else {
      const houseScore = this.house.getHandScore();
      const playerScore = player.getHandScore();
      const isPlayerBlackjack = player.isBlackjack();
      const isHouseBlackjack = this.house.isBlackjack();
      if (houseStatus === "Bust" || houseScore < playerScore) {
        const incrementAmount = isPlayerBlackjack
          ? playerBet * 1.5
          : playerStatus === "Double"
          ? playerBet * 2
          : playerBet;
        player.resultWin(incrementAmount);
      } else if (isHouseBlackjack || playerScore < houseScore) {
        if (isPlayerBlackjack) player.resultDraw();
        else {
          const decrementAmount =
            playerStatus === "Double" ? playerBet * 2 : playerBet;
          player.resultLose(decrementAmount);
        }
      }
    }
  };
}
