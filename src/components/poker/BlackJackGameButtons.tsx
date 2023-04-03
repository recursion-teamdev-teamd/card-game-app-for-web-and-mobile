import React from "react";
import { FC } from "react";
import { BasicButton } from "@/components/ui/atoms/buttons/BasicButton";
import { GambleGamePhase } from "@/models/gamePhase/gamePhase";

type Props = {
  blackJackTable;
  handleClickHitBtn;
  handleClickStandBtn;
  handleClickGameAgainBtn;
};

export const BlackJackGameButtons: FC<Props> = (props) => {
  const {
    blackJackTable,
    handleClickHitBtn,
    handleClickStandBtn,
    handleClickGameAgainBtn,
  } = props;

  return (
    <>
      <div className="h-5">
        <BasicButton
          buttonType="red"
          mediaQueries="p-4 mr-3"
          onClick={handleClickHitBtn}
        >
          hit
        </BasicButton>
        <BasicButton
          buttonType="blue"
          mediaQueries="p-4 mr-3"
          onClick={handleClickStandBtn}
        >
          stand
        </BasicButton>
        {blackJackTable.gamePhase == GambleGamePhase.roundOver && (
          <BasicButton
            buttonType="red"
            mediaQueries="p-4 mr-3 h-5 "
            onClick={handleClickGameAgainBtn}
          >
            again
          </BasicButton>
        )}
      </div>
    </>
  );
};
