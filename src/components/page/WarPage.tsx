import { Card } from "@/models/card/card";
import React, { useEffect, useState } from "react";
import { CardComponent } from "../common/card/CardComponent";
import { CardsOverLap } from "../common/card/CardsOverLap";
import { WarPlayerComponent } from "../games/war/WarPlayerComponent";
import { GamePageLayout } from "../common/ui/layout/GamePageLayout";
import { WarTableComponent } from "../games/war/WarTableComponent";
import { WarTable } from "@/models/table/table";

export const WarPage = () => {
  const [table, setTable] = useState(new WarTable());

  useEffect(() => {
    setTable((table) => {
      table.initForNewGame();
      return table;
    });
  }, []);

  return (
    <GamePageLayout>
      <WarTableComponent table={table} />
    </GamePageLayout>
  );
};
