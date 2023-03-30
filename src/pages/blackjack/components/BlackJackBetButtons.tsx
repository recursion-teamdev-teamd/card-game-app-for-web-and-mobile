import React from "react";
import { FC } from "react";
import { BasicButton } from "@/components/ui/atoms/buttons/BasicButton";
import { BlackjackTable } from "@/models/table/table";

type Props = {
  blackJackTable: BlackjackTable;
  handleClickBetChip;
};
export const BlackJackBetButtons: FC<Props> = (props) => {
  const { blackJackTable, handleClickBetChip } = props;

  return (
    <>
      <div className="h-5">
        <BasicButton
          buttonType="red"
          mediaQueries="p-4 mr-3"
          onClick={() => handleClickBetChip(5)}
        >
          5
        </BasicButton>
        <BasicButton
          buttonType="blue"
          mediaQueries="p-4 mr-3"
          onClick={() => handleClickBetChip(20)}
        >
          20
        </BasicButton>
        <BasicButton
          buttonType="red"
          mediaQueries="p-4 mr-3"
          onClick={() => handleClickBetChip(50)}
        >
          50
        </BasicButton>
        <BasicButton
          buttonType="red"
          mediaQueries="p-4"
          onClick={() => handleClickBetChip(100)}
        >
          100
        </BasicButton>
      </div>
    </>
  );
};
