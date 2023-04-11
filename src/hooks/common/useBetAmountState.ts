import { useState } from "react";

export const useBetAmountState = () => {
  // useStateでbet額を管理
  const [totalBetAmount, setTotalBetAmount] = useState(0);
  // stakes(賭け金)の種類
  const betAmountArr = [5, 20, 50, 100];

  const handleClickBetPlusBtn = (betAmountInput: number) => {
    console.log("bet plus");
    setTotalBetAmount((totalBetAmount) => totalBetAmount + betAmountInput);
  };

  const handleClickBetMinusBtn = (betAmountInput: number) => {
    console.log("bet minus");
    totalBetAmount >= betAmountInput &&
      setTotalBetAmount((totalBetAmount) => totalBetAmount - betAmountInput);
  };

  return {
    totalBetAmount,
    betAmountArr,
    handleClickBetPlusBtn,
    handleClickBetMinusBtn,
  };
};
