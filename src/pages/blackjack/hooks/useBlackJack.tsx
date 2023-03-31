import React from "react";

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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [blackJackTable, setBlackJackTable] = useState<BlackjackTable>(
    new BlackjackTable("userName")
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [toggleVal, setToggleVal] = useState<boolean>(false);
  function render() {
    setToggleVal((val) => !val);
  }

  const handleClickStandBtn = () => {
    setBlackJackTable((table) => {
      table.user.setPlayerStatus(BlackJackPlayerStatus.stand);
      return table;
    });
    render();
  };
  const handleClickHitBtn = () => {
    setBlackJackTable((table) => {
      table.user.setPlayerStatus(BlackJackPlayerStatus.hit);
      return table;
    });
    render();
  };
  const handleClickBetChip = (chipValue: number) => {
    setBlackJackTable((table: BlackjackTable) => {
      if (chipValue <= table.user.getChips() - table.user.getBet()) {
        table.user.setBet(blackJackTable.user.getBet() + chipValue);
      }
      return table;
    });
    render();
  };

  const handleClickGameStartBtn = () => {
    setBlackJackTable((table) => {
      table.user.setPlayerStatus(BlackJackPlayerStatus.waiting);
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
