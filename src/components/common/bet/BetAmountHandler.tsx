import { FC, useState } from "react";

import { motion } from "framer-motion";
import { BasicButton } from "../ui/atoms/buttons/BasicButton";
import { useBetAmountState } from "@/hooks/common/useBetAmountState";

// betを決定する関数をPropsで受け取る
type Props = {
  handleClickBetSubmitBtn: (bet: number) => void;
};

export const BetAmountHandler: FC<Props> = ({ handleClickBetSubmitBtn }) => {
  const {
    betAmountArr,
    totalBetAmount,
    handleClickBetMinusBtn,
    handleClickBetPlusBtn,
  } = useBetAmountState();

  return (
    <>
      <div className="space-y-3 py-3 md:space-y-6 md:py-6">
        {betAmountArr.map((betAmount) => (
          <div className="text-center" key={betAmount}>
            <p className="font-bold text-lg md:text-2xl">${betAmount}</p>
            <div className="w-full flex space-x-1 justify-center items-center">
              <BasicButton
                buttonType="blue"
                mediaQueries="py-1 px-2"
                onClick={() => handleClickBetPlusBtn(betAmount)}
              >
                ＋
              </BasicButton>
              <BasicButton
                buttonType="red"
                mediaQueries="py-1 px-2"
                onClick={() => handleClickBetMinusBtn(betAmount)}
              >
                ー
              </BasicButton>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-3">
        <BasicButton
          buttonType="blue"
          mediaQueries="py-2 px-5 md:py-4 md:px-8 text-2xl"
          onClick={() => handleClickBetSubmitBtn(totalBetAmount)}
        >
          Submit your bet {totalBetAmount > 0 ? `for $${totalBetAmount}` : ""}!
        </BasicButton>
      </div>
    </>
  );
};
