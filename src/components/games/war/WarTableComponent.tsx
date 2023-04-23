import React, { FC } from "react";
import { WarPlayerComponent } from "./WarPlayerComponent";
import { SelectedCardsComponent } from "./SelectedCardsComponent";
import { HandCardsComponent } from "@/components/common/card/HandCardsComponent";
import { WarTable } from "@/models/table/warTable";
import { WarGamePhase } from "@/models/gamePhase/gamePhase";
import { SelectedCardsArea } from "./SelectedCardsArea";
import { GameResultComponent } from "./GameResultComponent";

type WarTableProps = {
  table: WarTable;
  handleClickCard: any;
  gamePhase: WarGamePhase;
  handleClickNextGame: () => void;
};

export const WarTableComponent: FC<WarTableProps> = (props) => {
  const { table, handleClickCard, gamePhase, handleClickNextGame } = props;

  return (
    <>
      <div className="relative h-[30%] w-full">
        <div className="absolute top-[50%] left-[10%] sm:left-[20%] md:left-[30%] lg:left-[40%]">
          <HandCardsComponent cards={table.cpu.hand} disable={true} />
        </div>
        <div className="absolute top-0 right-0">
          <WarPlayerComponent player={table.cpu} />
        </div>
      </div>
      <div className="relative h-[30%] w-full flex justify-around space-x-8">
        {gamePhase === "Result" ? (
          <GameResultComponent
            table={table}
            handleClickNextGame={handleClickNextGame}
          />
        ) : (
          <SelectedCardsArea table={table} />
        )}
      </div>
      <div className="relative h-[30%] w-full">
        <div className="absolute top-[20%] left-[10%] sm:left-[20%] md:left-[30%] lg:left-[40%]">
          <HandCardsComponent
            cards={table.user.hand}
            handleClickCard={handleClickCard}
            disable={gamePhase !== "Selection"}
          />
        </div>
        <div className="absolute bottom-0 left-0">
          <WarPlayerComponent player={table.user} />
        </div>
      </div>
    </>
  );
};
