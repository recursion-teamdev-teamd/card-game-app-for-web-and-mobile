import { CardComponent } from "@/components/common/card/CardComponent";
import { CardsOverLap } from "@/components/common/card/CardsOverLap";
import { Card } from "@/models/card/card";
import { WarTable } from "@/models/table/table";
import React, { FC, useState } from "react";
import { WarPlayerComponent } from "./WarPlayerComponent";
import { WarPlayer } from "@/models/player/player";
import { SelectedCardsComponent } from "./SelectedCardsComponent";

type CardsFieldProps = {
  table: WarTable;
  handleClickCard: any;
};

export const WarTableComponent: FC<CardsFieldProps> = (props) => {
  const { table, handleClickCard } = props;

  return (
    <>
      <div className="relative h-[30%] w-full">
        <div className="absolute top-[50%] left-[10%] sm:left-[20%] md:left-[30%] lg:left-[40%]">
          <CardsOverLap cards={table.cpu.hand} onClickCard={handleClickCard} />
        </div>
        <div className="absolute top-0 right-0">
          <WarPlayerComponent player={table.cpu} />
        </div>
      </div>
      <div className="relative h-[30%] w-full">
        <SelectedCardsComponent
          userSelectedCard={table.user.selectedCard}
          cpuSelectedCard={table.cpu.selectedCard}
        />
      </div>
      <div className="relative h-[30%] w-full">
        <div className="absolute top-[20%] left-[10%] sm:left-[20%] md:left-[30%] lg:left-[40%]">
          <CardsOverLap cards={table.user.hand} onClickCard={handleClickCard} />
        </div>
        <div className="absolute bottom-0 left-0">
          <WarPlayerComponent player={table.user} />
        </div>
      </div>
    </>
  );
};
