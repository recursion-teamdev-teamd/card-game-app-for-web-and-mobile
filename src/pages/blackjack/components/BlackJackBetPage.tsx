import { BlackJackBetButtons } from "./BlackJackBetButtons";
import { BlackjackTable } from "@/models/table/table";
import { BasicButton } from "./BlackJackPlayerStatus";

import { FC, ReactNode } from "react";
import { BlackjackPlayer } from "@/models/player/player";
import { useState } from "react";

type Props = {
  blackJackTable: BlackjackTable;
  handleClickBetChip;
  handleClickGameStartBtn: void;
};

export const BlackJackBetPage: FC<Props> = (props) => {
  const { blackJackTable, handleClickBetChip, handleClickGameStartBtn } = props;
  return (
    <>
      <div className="flex flex-wrap justify-center align-middle bg-sky-500 h-screen">
        <div className="w-screen text-center font-bold mt-3">
          click chips to bet
        </div>

        <BasicButton
          buttonType="red"
          mediaQueries="p-4 mr-3"
          onClick={() => handleClickGameStartBtn()}
        >
          gamestart
        </BasicButton>

        <BlackJackBetButtons />
      </div>
    </>
  );
};
