import React from "react";
import { FC } from "react";
import { BasicButton } from "@/components/ui/atoms/buttons/BasicButton";
import { BlackjackTable } from "@/models/table/table";

type Props = { handleClickHitBtn; handleClickStandBtn };

export const BlackJackGameButtons: FC<Props> = (props) => {
  const { handleClickHitBtn, handleClickStandBtn } = props;
  return (
    <>
      <div className="h-5">
        <BasicButton
          buttonType="red"
          mediaQueries="p-4 mr-3"
          onClick={() => handleClickHitBtn()}
        >
          hit
        </BasicButton>
        <BasicButton
          buttonType="blue"
          mediaQueries="p-4 mr-3"
          onClick={() => handleClickStandBtn()}
        >
          stand
        </BasicButton>
      </div>
    </>
  );
};
