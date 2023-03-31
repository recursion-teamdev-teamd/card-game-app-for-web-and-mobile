import { gameInfoWar, gameInfoBlackJack } from "./../gameInfo/gameInfo";
import { VanilaPlayer } from "../player/abstractPlayer";
import { BlackJackPlayerType } from "../playerType/playerType";
import { Deck } from "../deck/deck";
import { GameInfo } from "../gameInfo/gameInfo";
import { BlackjackPlayer } from "../player/player";
import { BlackJackPlayerStatus } from "../playerStatus/playerStatus";
import {
  AbstractPokerTable,
  GambleTable,
  VanilaTable,
  TurnGameTable,
} from "./abstractTable";
// ターンの概念が無いゲーム
export class WarTable extends VanilaTable {
  gameInfo: GameInfo = gameInfoWar;
}

export class SpeedTable extends VanilaTable {}

// ターンの概念があり、賭け金がいらないゲーム
export class RummyTable extends TurnGameTable {}

// ターンの概念があり、賭け金を要するゲーム
export class BlackjackTable extends GambleTable {
  private _gameInfo: GameInfo = gameInfoBlackJack;
  private _players: BlackjackPlayer[] = [];
  private _house: BlackjackPlayer = new BlackjackPlayer(
    0,
    "house",
    BlackJackPlayerType.AI,
    BlackJackPlayerStatus.bet,
    []
  );

  private _user: BlackjackPlayer = new BlackjackPlayer(
    1,
    "user",
    BlackJackPlayerType.USER,
    BlackJackPlayerStatus.bet,
    []
  );

  constructor(userName: string) {
    super();
    this.deck = new Deck(this.gameInfo);
    this.user = new BlackjackPlayer(
      0,
      userName,
      BlackJackPlayerType.USER,
      BlackJackPlayerStatus.bet,
      []
    );
    this.players = [this.house, this.user];
  }

  public hit(player: BlackjackPlayer) {
    const card = this.deck.drawOne();
    if (card != undefined) {
      player.hand.push(card);
    }
  }
  public get gameInfo() {
    return this._gameInfo;
  }

  public get deck(): Deck {
    return this._deck;
  }

  public set deck(v: Deck) {
    this._deck = v;
  }

  public get house(): BlackjackPlayer {
    return this._house;
  }

  public get user(): BlackjackPlayer {
    return this._user;
  }

  public set user(v: BlackjackPlayer) {
    this._user = v;
  }
}

// ポーカー系のゲーム
export class PokerTable extends AbstractPokerTable {}

export class TexasPokerTable extends AbstractPokerTable {}
