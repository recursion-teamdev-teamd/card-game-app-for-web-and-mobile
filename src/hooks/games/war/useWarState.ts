import { WarGamePhase } from "./../../../models/gamePhase/gamePhase";
import { Card } from "@/models/card/card";

import React, { useCallback, useState } from "react";
import _ from "lodash";
import { WarTable } from "@/models/table/warTable";

export const useWarState = () => {
  const [table, setTable] = useState(new WarTable());
  const [gamePhase, setGamePhase] = useState<WarGamePhase>("Selection");

  // const [selectedCard, setSelectedCard] = useState<CardOrNull>(null);
  // const [cardsInStrage, setCardsInStrage] = useState<Card[]>([]);

  const handleOnFirstLogin = useCallback((userName: string) => {
    setTable((table) => {
      const newTable = _.cloneDeep(table);
      newTable.setUserName(userName);
      newTable.initForNewGame();
      return newTable;
    });
  }, []);

  const handleClickCard = (index: number) => {
    setTable((table) => {
      const newTable = _.cloneDeep(table);
      newTable.playersSelectCard(index);
      return newTable;
    });
    setGamePhase("Comparison");
    setTimeout(() => {
      cardComparison();
    }, 1000);
  };

  const cardComparison = () => {
    setTable((table) => {
      const newTable = _.cloneDeep(table);
      newTable.compareCard();
      return newTable;
    });
  };

  const checkIfGameIsOver = () => {
    console.log(table.isGameOver());
    if (table.isGameOver()) {
      setGamePhase("Result");
      setTable((table) => {
        const newTable = _.cloneDeep(table);
        newTable.setResult();
        return newTable;
      });
    } else {
      setGamePhase("Selection");
    }
  };

  const handleClickNextGame = () => {
    setTable((table) => {
      const newTable = _.cloneDeep(table);
      newTable.initForNewGame();
      return newTable;
    });
    setGamePhase("Selection");
  };

  return {
    table,
    handleOnFirstLogin,
    handleClickCard,
    gamePhase,
    handleClickNextGame,
    checkIfGameIsOver,
  };
};
