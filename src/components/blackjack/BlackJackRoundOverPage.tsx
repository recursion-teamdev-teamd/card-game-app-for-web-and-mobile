import { BlackJackBetButtons } from "./BlackJackBetButtons";
import { BlackjackTable } from "@/models/table/table";
import { BasicButton } from "./BlackJackPlayerStatus";
import { FC, ReactNode } from "react";
import { BlackjackPlayer } from "@/models/player/player";
import { BlackJackGameAgainBtn } from "./BlackJackGameAgainBtn";
import { useState } from "react";

type Props = {
  handleClickGameAgainBtn;
};

export const BlackJackRoundOverPage: FC<Props> = (props) => {
  const { handleClickGameAgainBtn } = props;

  const BlackJackGameAgainProps = {
    handleClickGameAgainBtn,
  };
  return (
    <>
      <div className="flex flex-wrap justify-center align-middle bg-sky-500 h-screen">
        <div className="w-screen text-center font-bold mt-3">
          click chips to bet
        </div>
        <BlackJackGameAgainBtn {...BlackJackGameAgainProps} />
      </div>
    </>
  );
};
