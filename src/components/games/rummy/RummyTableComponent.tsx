import { CardComponent } from "@/components/common/card/CardComponent";
import { CardsOverLap } from "@/components/common/card/CardsOverLap";
import { DisabledCardComponent } from "@/components/common/card/DisabledCardComponent";
import { Card } from "@/models/card/card";
import { RummyTable } from "@/models/table/rummyTable";
import React, { FC } from "react";
import { RummyAIPlayers } from "./RummyAIPlayers";
import { RummyDeckAndDiscardArea } from "./RummyDeckAndDiscardArea";
import { RummyMeldArea } from "./RummyMeldArea";
import { RummyPlayerComponent } from "./RummyPlayerComponent";
type Props = {
  table: RummyTable;
  isUserTurn: boolean;
};

export const RummyTableComponent: FC<Props> = ({ table, isUserTurn }) => {
  console.log(table);

  return (
    <>
      <div className="relative h-[30%] w-full">
        <div className="absolute top-[50%] sm:top-[40%] sm:left-[20%] lg:left-[30%] xl:left-[35%]">
          <RummyAIPlayers players={table.players} />
        </div>
      </div>
      <div className="relative h-[20%] sm:h-[20%] w-full">
        <div className="absolute top-[10%] w-full h-full">
          <RummyMeldArea
            meldCards={table.meldArea}
            handleClickCards={() => alert()}
          />
        </div>
      </div>
      <div className="relative h-[5%] sm:h-[5%] w-full">
        <div className="absolute top-[80%] w-full h-full">
          <RummyDeckAndDiscardArea isUserTurn={isUserTurn} table={table} />
        </div>
      </div>
      <div className="relative h-[30%] w-full">
        <div className="absolute w-full top-[60%] sm:top-[40%]">
          <div className="flex justify-center items-center w-full">
            <RummyPlayerComponent player={table.user} disable={!isUserTurn} />
          </div>
        </div>
      </div>
    </>
  );
};
