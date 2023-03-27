import { Deck } from "../deck/deck";
import { GameInfo } from "../gameInfo/gameInfo";
import {
  GamblePlayer,
  ScoreGamePlayer,
  VanilaPlayer,
} from "../player/abstractPlayer";

export abstract class VanilaTable {
  abstract _gameInfo: GameInfo;
  abstract _deck: Deck;
  abstract _players: VanilaPlayer[];
  abstract _gamePhase: string;
  abstract _gameResult: string;

  public set deck(deck: Deck) {
    this._deck = deck;
  }
}

export abstract class TurnGameTable extends VanilaTable {
  protected turnCounter: number = 0;
  protected getTurnCounter = () => this.turnCounter;
  protected setTurnCounter = (turnCounter: number) =>
    (this.turnCounter = turnCounter);

  protected inclementTurnCounter(): void {
    this.setTurnCounter(this.getTurnCounter() + 1);
  }

  protected onLastPlayer(player: VanilaPlayer): boolean {
    if (player == this.players[this.players.length - 1]) return true;
    return false;
  }
}

export abstract class GambleTable extends TurnGameTable {
  abstract betDenominations: number[];
  abstract hit: (player: VanilaPlayer) => void;
}

export abstract class AbstractPokerTable extends GambleTable {
  protected lastRaisePlayerId: number | null = null;

  protected getLastRaisePlayerID = () => this.lastRaisePlayerId;
  protected setLastRaisePlayerID = (id: number) =>
    (this.lastRaisePlayerId = id);
  abstract call: (player: VanilaPlayer) => void;
  abstract raise: (player: VanilaPlayer) => void;
  abstract fold: (player: VanilaPlayer) => void;
  abstract waiting: (player: VanilaPlayer) => void;
}
