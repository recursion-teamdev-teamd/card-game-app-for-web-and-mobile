import { PlayerField } from "./PlayerField";
import { BlackJackGameButtons } from "./BlackJackGameButtons";

import { FC } from "react";
import React from "react";

type Props = {
  blackJackTable;
  handleClickHitBtn;
  handleClickStandBtn;
  handleClickGameAgainBtn;
};

export const BlackJackGameTable: FC<Props> = (props) => {
  const {
    blackJackTable,
    handleClickHitBtn,
    handleClickStandBtn,
    handleClickGameAgainBtn,
  } = props;

  const BlackJackGameButtonsProps = {
    blackJackTable,
    handleClickHitBtn,
    handleClickStandBtn,
    handleClickGameAgainBtn,
  };

  const houseProps = { player: blackJackTable.house };
  const userProps = { player: blackJackTable.user };
  return (
    <>
      <div>
        <div className="flex  justify-center">
          <div className="grid grid-rows-2 grid-flow-col gap-4">
            <div className="flex bg-cyan-500 justify-center">
              <PlayerField {...houseProps} />
            </div>
            <div className="flex  justify-center">
              <PlayerField {...userProps} />
            </div>
          </div>
        </div>
        <BlackJackGameButtons {...BlackJackGameButtonsProps} />
      </div>
    </>
  );
};
