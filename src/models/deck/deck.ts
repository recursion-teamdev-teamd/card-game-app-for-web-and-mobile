import { Card } from "../card/card";
import { GameInfo } from "../gameInfo/gameInfo";

export class Deck {
  public static readonly SUITS = ["S", "H", "D", "C"];
  public static readonly RANKS = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  public cards: Card[];
  public GameInfo: GameInfo;

  constructor(GameInfo: GameInfo) {
    this.cards = Deck.createDeck(GameInfo);
    this.GameInfo = GameInfo;
  }

  public static createDeck(GameInfo: GameInfo): Card[] {
    const s = Deck.SUITS.length;
    const r = Deck.RANKS.length;

    const deck: Card[] = [];

    for (let i = 0; i < s; i++) {
      for (let j = 0; j < r; j++) {
        const imgUrl = "/cards/" + Deck.RANKS[j] + "-" + Deck.SUITS[i] + ".png";
        deck.push(
          new Card(
            Deck.RANKS[j] as
              | "A"
              | "2"
              | "3"
              | "4"
              | "5"
              | "6"
              | "7"
              | "8"
              | "9"
              | "10"
              | "J"
              | "Q"
              | "K",
            Deck.SUITS[i] as "H" | "D" | "S" | "C",
            GameInfo.isCardOpen,
            imgUrl
          )
        );
      }
    }

    //add jokers if they`re needed
    for (let i = 0; i < GameInfo.jokerNum; i++) {
      let joker = new Card(
        "Joker",
        "Joker",
        GameInfo.isCardOpen,
        "/cards/JOKER.png"
      );
      deck.push(joker);
    }

    return deck;
  }

  public shuffleDeck(): void {
    const deckSize = this.cards.length;

    for (let i = deckSize - 1; i >= 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1)); //なぜi+1? i = deckSize - 1 の時５２になりかねなくね？

      let temp = this.cards[i];

      this.cards[i] = this.cards[randomIndex];
      this.cards[randomIndex] = temp;
    }
  }

  public drawOne(): Card | undefined {
    if (this.cards[0] === undefined) {
      alert("There aren`t any more cards.");
      return;
    }
    return this.cards.pop();
  }

  public resetDeck() {
    this.cards = Deck.createDeck(this.GameInfo);
  }
}

export class BlackJackDeck extends Deck {}
