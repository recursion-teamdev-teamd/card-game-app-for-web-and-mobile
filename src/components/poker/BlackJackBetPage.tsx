import { BlackJackBetButtons } from "./BlackJackBetButtons";
import { BlackjackTable } from "@/models/table/table";
import { BasicButton } from "./BlackJackPlayerStatus";
import { BlackJackGameStartBtn } from "./BlackJackGameStartBtn";
import { FC, ReactNode } from "react";
import { BlackjackPlayer } from "@/models/player/player";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";

type Props = {
  setBlackJackTable;
  handleClickBetChip;
  handleClickGameStartBtn;
  render;
};

export const BlackJackBetPage: FC<Props> = (props) => {
  const {
    setBlackJackTable,
    handleClickBetChip,
    handleClickGameStartBtn,
    render,
  } = props;

  useEffect(() => {
    setBlackJackTable((table: BlackjackTable) => {
      table.initTableForNewGame();
      return table;
    });
    render();
  }, []);

  const BlackJackBetButtonsProps = {
    handleClickBetChip,
  };
  const BlackJackGameStartBtnProps = {
    handleClickGameStartBtn,
  };
  return (
    <>
      <div className="flex flex-wrap justify-center align-middle bg-sky-500 h-screen">
        <div className="w-screen text-center font-bold mt-3">
          click chips to bet
        </div>
        <BlackJackGameStartBtn {...BlackJackGameStartBtnProps} />
        <BlackJackBetButtons {...BlackJackBetButtonsProps} />
      </div>
    </>
  );
};
