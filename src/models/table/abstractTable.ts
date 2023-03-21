import { Deck } from "../deck/deck";
import { VanilaPlayer } from "../player/abstractPlayer";

export abstract class VanilaTable {
   abstract deck : Deck
   abstract playerList : VanilaPlayer[]
};

export abstract class TurnGameTable extends VanilaTable {

};

export abstract class GambleTable extends TurnGameTable {

};

export abstract class AbstractPokerTable extends GambleTable {
    
}