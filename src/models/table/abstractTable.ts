import { Deck } from "../deck/deck";

export abstract class VanilaTable {
   
};

export abstract class TurnGameTable extends VanilaTable {

};

export abstract class GambleTable extends TurnGameTable {

};

export abstract class AbstractPokerTable extends GambleTable {
    
}