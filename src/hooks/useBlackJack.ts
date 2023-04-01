import React, { useMemo } from "react";
import { GambleGamePhase } from "@/models/gamePhase/gamePhase";

import Head from "next/head";
import { useEffect } from "react";
import { BlackJackPlayerType } from "@/models/playerType/playerType";
import { BlackJackPlayerStatus } from "@/models/playerStatus/playerStatus";
import { BlackJackBetPage } from "./components/BlackJackBetPage";
import { BlackJackGamePage } from "./components/BlackJackGamePage";
import { BlackjackPlayer } from "@/models/player/player";

import { useState } from "react";
import { BlackjackTable } from "@/models/table/table";

export const useBlackJackState = () => {
  const [blackJackTable, setBlackJackTable] = useState<BlackjackTable>(
    new BlackjackTable("userName")
  );

  const [toggleVal, setToggleVal] = useState<boolean>(false);

  function render() {
    setToggleVal((val) => !val);
  }

  const handleClickHitBtn = useMemo(() => {
    setBlackJackTable((table: BlackjackTable) => {
      // if (table.user.playerStatus == BlackJackPlayerStatus.roundOver)
      //   return table;
      table.user.playerStatus = BlackJackPlayerStatus.hit;
      table.haveTableTurn();
      return table;
    });
    render();
  }, []);

  const handleClickStandBtn = () => {
    setBlackJackTable((table: BlackjackTable) => {
      table.user.playerStatus = BlackJackPlayerStatus.stand;
      table.haveTableTurn();
      return table;
    });
    render();
  };

  const handleClickBetChip = (chipValue: number) => {
    setBlackJackTable((table: BlackjackTable) => {
      if (chipValue <= table.user.chips - table.user.chips)
        table.user.bet = blackJackTable.user.bet + chipValue;
      return table;
    });

    render();
  };

  const handleClickGameStartBtn = () => {
    setBlackJackTable((table: BlackjackTable) => {
      table.initTableForNewGame();
      table.players.map((player) => {
        player.playerStatus = BlackJackPlayerStatus.waiting;
        table.gamePhase = GambleGamePhase.acting;
      });
      return table;
    });
    render();
  };
  return {
    blackJackTable,
    setBlackJackTable,
    render,
    handleClickStandBtn,
    handleClickHitBtn,
    handleClickBetChip,
    handleClickGameStartBtn,
  };
};
