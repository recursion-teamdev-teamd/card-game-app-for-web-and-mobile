import React, { useState } from "react";
import { Card } from "@/models/card/card";
import { SpeedTable } from "@/models/table/table";
import _ from "lodash";
export const useSpeedState = (userName: string) => {
  type CardOrNull = Card | null;
  const [speedTable, setSpeedTable] = useState<SpeedTable>(
    new SpeedTable("userName")
  );
  const [selectedCard, setSelectedCard] = useState<CardOrNull>(null);
  const [cardsInStrages, setCardsInStrages] = useState<Card[]>([
    new Card("Joker", "Joker", false, "/cards/BACK.png"),
    new Card("Joker", "Joker", false, "/cards/BACK.png"),
  ]);

  const handleClickCard = (card: Card) => {
    setSelectedCard(card);
  };

  const handleClickCardInStrages = (
    strageIndex: number,
    cardInStrages: Card
  ) => {
    setSelectedCard((selectedCard) => {
      if (canPutInStrage(cardInStrages, selectedCard)) {
        setSpeedTable((table) => {
          const newTable: SpeedTable = _.cloneDeep(table);
          let newUserHand: Card[] = [];

          for (const card of newTable.user.hand) {
            if (
              card.rank == selectedCard!.rank &&
              card.suit == selectedCard!.suit
            )
              continue;
            newUserHand.push(card);
          }
          if (newUserHand.length == 0) newTable.gamePhase = "roundOver";

          newTable.user.hand = newUserHand;
          return newTable;
        });

        setCardsInStrages((cardsInStrages: Card[]) => {
          cardsInStrages[strageIndex] = selectedCard!;
          return cardsInStrages;
        });
      }
      return null;
    });
  };

  const hancleClickGameStartBtn = () => {
    setSpeedTable((table: SpeedTable) => {
      const newTable: SpeedTable = _.cloneDeep(table);
      newTable.initTableForNewGame();
      newTable.assignPlayersHand();
      // newTable.user.hand.splice(2, 23);
      newTable.gamePhase = "acting";
      setCardsInStrages((cardsInStrages: Card[]) => {
        const strages: Card[] = _.cloneDeep(cardsInStrages);
        strages[0] = newTable.house.hand.pop()!;
        strages[1] = newTable.user.hand.pop()!;
        return strages;
      });
      return newTable;
    });
  };

  const hancleClickGameReStartBtn = () => {
    setSpeedTable((table: SpeedTable) => {
      const newTable: SpeedTable = _.cloneDeep(table);
      if (newTable.house.hand.length == 1 || newTable.user.hand.length == 1)
        newTable.gamePhase = "roundOver";

      setCardsInStrages((cardsInStrages: Card[]) => {
        const strages: Card[] = _.cloneDeep(cardsInStrages);
        if (newTable.house.hand.length > 0 && newTable.user.hand.length > 0) {
          strages[0] = newTable.house.hand.pop()!;
          strages[1] = newTable.user.hand.pop()!;
        }
        return strages;
      });

      return newTable;
    });
  };
  const executeHouseAction = () => {
    setSpeedTable((table: SpeedTable) => {
      const newTable: SpeedTable = _.cloneDeep(table);

      let houseHandCandidate: Card[] = [];
      let candidateNum = Math.min(4, newTable.house.hand.length);
      for (let index = 0; index < candidateNum; index++) {
        const candidateCard = newTable.house.hand[index];
        houseHandCandidate.push(candidateCard);
      }

      setCardsInStrages((cardsInStrages: Card[]) => {
        for (const candidateCard of houseHandCandidate) {
          for (
            let strageIndex = 0;
            strageIndex < cardsInStrages.length;
            strageIndex++
          ) {
            if (canPutInStrage(cardsInStrages[strageIndex], candidateCard)) {
              let newHouseHand = [];
              for (const card of newTable.house.hand) {
                if (
                  card.rank == candidateCard!.rank &&
                  card.suit == candidateCard!.suit
                )
                  continue;
                newHouseHand.push(card);
              }
              if (newHouseHand.length == 0) newTable.gamePhase = "roundOver";
              newTable.house.hand = newHouseHand;

              cardsInStrages[strageIndex] = candidateCard;
              return cardsInStrages;
            }
          }
        }
        return cardsInStrages;
      });
      return newTable;
    });

    return null;
  };

  function canPutInStrage(cardInStrages: Card, selectedCard: CardOrNull) {
    if (selectedCard == null) return;
    let selectedCardRankNumber = selectedCard.getRankNumberInSpeed();
    let cardInStragesRankNumber = cardInStrages.getRankNumberInSpeed();

    if (
      selectedCardRankNumber ===
        getActualRankNumber(cardInStragesRankNumber - 1) ||
      selectedCardRankNumber ===
        getActualRankNumber(cardInStragesRankNumber + 1)
    )
      return true;
    return false;
  }
  function getActualRankNumber(rankNumber: number) {
    if (rankNumber > 13) return rankNumber % 13;
    if (rankNumber <= 0) return rankNumber + 13;
    return rankNumber;
  }

  return {
    speedTable,
    handleClickCard,
    cardsInStrages,
    setCardsInStrages,
    handleClickCardInStrages,
    hancleClickGameStartBtn,
    hancleClickGameReStartBtn,
    executeHouseAction,
  };
};
