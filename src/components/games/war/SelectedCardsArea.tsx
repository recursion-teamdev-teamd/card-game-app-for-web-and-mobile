import { HandCardsComponent } from "@/components/common/card/HandCardsComponent";
import { WarTable } from "@/models/table/warTable";
import React, { FC } from "react";
import { SelectedCardsComponent } from "./SelectedCardsComponent";

type Props = {
  table: WarTable;
};

export const SelectedCardsArea: FC<Props> = ({ table }) => {
  return (
    <>
      <SelectedCardsComponent
        userSelectedCard={table.user.selectedCard}
        cpuSelectedCard={table.cpu.selectedCard}
      />
      <div className="absolute py-2 px-4 text-[#ffffff] bg-[#000000] bg-opacity-50 right-5">
        <p className="text-center font-semibold">
          Stock : {table.stock.length}
        </p>
        {table.stock.length > 0 && (
          <HandCardsComponent cards={table.stock} disable={true} />
        )}
      </div>
    </>
  );
};
