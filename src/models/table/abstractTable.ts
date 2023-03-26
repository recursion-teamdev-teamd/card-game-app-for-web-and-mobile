import { Deck } from "../deck/deck";
import { GameInfo } from "../gameInfo/gameInfo";
import {
  GamblePlayer,
  ScoreGamePlayer,
  VanilaPlayer,
} from "../player/abstractPlayer";

export abstract class VanilaTable {
  abstract gameInfo: GameInfo;
  abstract deck: Deck;
  abstract players: VanilaPlayer[];
  abstract gamePhase: string;
}

export abstract class TurnGameTable extends VanilaTable {
  protected turnCounter: number = 0;

  protected getTurnCounter = () => this.turnCounter;
  protected setTurnCounter = (turnCounter: number) =>
    (this.turnCounter = turnCounter);
}

export abstract class GambleTable extends TurnGameTable {
  abstract betDenominations: number;
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
