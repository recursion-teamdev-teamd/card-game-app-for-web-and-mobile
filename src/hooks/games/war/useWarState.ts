import { Card } from "@/models/card/card";
import { WarPlayer } from "@/models/player/player";
import { WarTable } from "@/models/table/table";
import React, { useCallback, useState } from "react";
// import _ from "lodash";

export const useWarState = () => {
  type CardOrNull = Card | null;
  const [warTable, setWarTable] = useState<WarTable>(new WarTable());
  const [cpu, setCpu] = useState<WarPlayer>(
    new WarPlayer(0, "CPU", "cpu", [], 0)
  );
  const [user, setUser] = useState<WarPlayer>(
    new WarPlayer(0, "YOU", "user", [], 0)
  );
  const [selectedCard, setSelectedCard] = useState<CardOrNull>(null);
  const [cardsInStrage, setCardsInStrage] = useState<Card[]>([]);

  const handleOnFirstLogin = useCallback((userName: string) => {
    setWarTable((WarTable) => {
      WarTable.setUserName(userName);
      WarTable.initForNewGame();
      WarTable.splitHalfOfDeck();
      return WarTable;
    });
  }, []);

  const handleClickCard = (card: Card) => {
    setSelectedCard(card);
  };

  const handleClickCardInStrages = (
    strageIndex: number,
    cardsInStrages: Card
  ) => {
    setSelectedCard((selectedCard) => {
      setWarTable((table) => {
        // const newTable: WarTable = _.cloneDeep(table);
        let newUserHand: Card[] = [];

        for (const card of table.user.hand) {
          if (
            card.rank === selectedCard!.rank &&
            card.suit === selectedCard!.suit
          )
            continue;
          newUserHand.push(card);
        }
        if (newUserHand.length === 0) table.gamePhase = "roundOver";

        table.user.hand = newUserHand;
        return table;
      });

      setCardsInStrage((cardsInStrages: Card[]) => {
        cardsInStrages[strageIndex] = selectedCard!;
        return cardsInStrages;
      });
      return null;
    });
  };

  return {
    warTable,
    selectedCard,
    cardsInStrage,
    handleOnFirstLogin,
    handleClickCard,
    setSelectedCard,
    handleClickCardInStrages,
  };
};
