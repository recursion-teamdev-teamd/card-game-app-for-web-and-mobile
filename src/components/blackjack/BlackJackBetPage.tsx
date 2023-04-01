import { BlackJackBetButtons } from "./BlackJackBetButtons";
import { BlackjackTable } from "@/models/table/table";
import { BasicButton } from "./BlackJackPlayerStatus";
import { BlackJackGameStartBtn } from "./BlackJackGameStartBtn";
import { FC, ReactNode } from "react";
import { BlackjackPlayer } from "@/models/player/player";
import { useState } from "react";

type Props = {
  handleClickBetChip;
  handleClickGameStartBtn;
};

export const BlackJackBetPage: FC<Props> = (props) => {
  const { handleClickBetChip, handleClickGameStartBtn } = props;

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
