import { PlayerStatus } from "./../playerStatus/playerStatus";
import { Deck } from "../deck/deck";
import { GameInfo } from "../gameInfo/gameInfo";
import {
  GamblePlayer,
  ScoreGamePlayer,
  VanilaPlayer,
} from "../player/abstractPlayer";

export abstract class VanilaTable {
  protected abstract _deck: Deck;
  protected abstract _gameResult: string;
  protected abstract _gamePhase: string;
  protected abstract _players: VanilaPlayer[];
  protected abstract readonly _gameInfo: GameInfo;

  public get deck() {
    return this._deck;
  }

  protected set deck(deck: Deck) {
    this._deck = deck;
  }

  protected abstract get players(): VanilaPlayer[];

  protected abstract set players(players: VanilaPlayer[]);

  public abstract get gameResult();

  protected abstract set gameResult(gameResult: string);

  public abstract get gamePhase();

  protected abstract set gamePhase(gamePhase: string);
}

export abstract class TurnGameTable extends VanilaTable {
  // ターンのインデックスを追うカウンタ
  private _turnCounter: number = 0;
  public get turnCounter(): number {
    return this._turnCounter;
  }
  protected set turnCounter(v: number) {
    this._turnCounter = v;
  }

  // turnCounterを＋１するメソッド
  protected inclementTurnCounter(): void {
    this.turnCounter = this.turnCounter + 1;
  }
  // turnCounterを０にするメソッド
  protected resetTurnCounter(): void {
    this.turnCounter = 0;
  }

  // 順番の先頭かをbooleanで返す
  public isOnTheTopPlayer(): boolean {
    return this.turnCounter === 0;
  }
  // turnCounterが順番の最後にあるか、booleanで返す
  public isOnTheLastPlayer(): boolean {
    return this.turnCounter === this.players.length - 1;
  }

  // turnを次のプレイヤーに回すメソッド
  public moveOnToNextPlayer(): void {
    // 順番の末尾にいたらカウンターをゼロに戻す
    if (this.isOnTheLastPlayer()) this.resetTurnCounter();
    else this.inclementTurnCounter();
  }
}

export abstract class GambleTable extends TurnGameTable {
  protected abstract _betDenominations: number[];

  public abstract setPlayerHit(player: GamblePlayer): void;

  public get betDenominations(): number[] {
    return this._betDenominations;
  }

  protected set betDenominations(betDenominations: number[]) {
    this._betDenominations = betDenominations;
  }

  // 全てのAIに最初のBetを選択させる関数　とりあえずAbstaractにしてます
  protected abstract makeAllAIInitialBet(): void;
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
