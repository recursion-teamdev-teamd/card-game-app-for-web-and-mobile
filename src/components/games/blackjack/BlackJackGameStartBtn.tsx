import React from "react";
import { FC } from "react";
import { BasicButton } from "@/components/commonUI/atoms/buttons/BasicButton";

type Props = {
  handleClickGameStartBtn;
};
export const BlackJackGameStartBtn: FC<Props> = (props) => {
  const { handleClickGameStartBtn } = props;

  return (
    <>
      <BasicButton
        buttonType="red"
        mediaQueries="p-4 mr-3 h-5 "
        onClick={handleClickGameStartBtn}
      >
        gamestart
      </BasicButton>
    </>
  );
};
