import React from "react";
import { GamePageLayout } from "../common/ui/layout/GamePageLayout";
import { SpeedTable } from "../games/speed/SpeedTable";

export const SpeedPage = () => {
  return (
    <GamePageLayout>
      <SpeedTable />
    </GamePageLayout>
  );
};
