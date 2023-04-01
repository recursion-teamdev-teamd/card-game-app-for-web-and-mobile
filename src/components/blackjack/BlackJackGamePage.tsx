import { BlackjackTable } from "@/models/table/table";
import { PlayerField } from "./PlayerField";
import { BlackJackGameButtons } from "./BlackJackGameButtons";
import Image from "next/image";
import { BasicButton } from "@/components/ui/atoms/buttons/BasicButton";

import { FC, ReactNode } from "react";
import { BlackjackPlayer } from "@/models/player/player";
import { useState } from "react";
import { CardComponent } from "@/components/model/card/CardComponent";

import { Card } from "@/models/card/card";
type Props = {
  blackJackTable: BlackjackTable;
  handleClickHitBtn;
  handleClickStandBtn;
};

export const BlackJackGamePage: FC<Props> = (props) => {
  const { blackJackTable, handleClickHitBtn, handleClickStandBtn } = props;

  const card = new Card("A", "H", false, "/cards/BACK.png");
  blackJackTable.house.setHand([card]);
  const BlackJackGameButtonsProps = {
    handleClickHitBtn,
    handleClickStandBtn,
  };
  const houseProps = { player: blackJackTable.house };

  return (
    <>
      <div>
        <div className="flex  justify-center">
          <div className="grid grid-rows-2 grid-flow-col gap-4">
            <div className="flex bg-cyan-500 justify-center">
              {<PlayerField {...houseProps} />}
            </div>
            <div className="flex  justify-center">
              <Image src={"/cards/BACK.png"} width={200} height={100} />
              <Image src={"/cards/BACK.png"} width={200} height={100} />
              <Image src={"/cards/BACK.png"} width={200} height={100} />
            </div>
          </div>
        </div>
        <BlackJackGameButtons {...BlackJackGameButtonsProps} />
      </div>
    </>
  );
};
