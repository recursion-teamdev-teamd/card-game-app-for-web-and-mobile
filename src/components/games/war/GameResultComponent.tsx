import { BasicButton } from "@/components/common/ui/atoms/buttons/BasicButton";
import { WarTable } from "@/models/table/warTable";
import React, { FC } from "react";

type Props = {
  table: WarTable;
  handleClickNextGame: () => void;
};
export const GameResultComponent: FC<Props> = ({
  table,
  handleClickNextGame,
}) => {
  const result = table.gameResult;
  return (
    <div className="text-center text-[#ffffff] space-y-3">
      <p className="text-lg font-bold">{result}!</p>
      <BasicButton
        buttonType="blue"
        mediaQueries="p-4"
        onClick={handleClickNextGame}
      >
        Next Game
      </BasicButton>
    </div>
  );
};
