import { FC } from "react";
import { BetAmountHandler } from "./BetAmountHandler";

// Bettingの画面。金額を引数にとってBet額を決定する handleClickBetSubmitBtn()関数と、
// その時点でのPlayerのChipの額を受け取る（Chipの額は、所持金いくら残ってるよ〜と表示するだけ）
export type BettingPhaseComponentProps = {
  handleClickBetSubmitBtn: (betAmountInput: number) => void;
  chips: number;
};

export const BettingPhaseComponent: FC<BettingPhaseComponentProps> = ({
  handleClickBetSubmitBtn,
  chips,
}) => {
  const betAmountHandlerProps = {
    handleClickBetSubmitBtn,
  };

  return (
    <div>
      <div className="py-10">
        <div className="text-center font-bold text-md md:text-xl">
          <p className="text-2xl md:text-4xl py-2">
            How much are you going to bet?
          </p>
          <p>
            You have <span className="text-xl">${chips}</span> left.
          </p>
          <p></p>
        </div>
        <BetAmountHandler {...betAmountHandlerProps} />
      </div>
    </div>
  );
};
