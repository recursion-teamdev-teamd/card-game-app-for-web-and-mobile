import React from "react";
import { GamePageLayout } from "../common/ui/layout/GamePageLayout";
import { SpeedTableComponent } from "../games/speed/SpeedTableComponent";

export const SpeedPage = () => {
  return (
    <GamePageLayout>
      <SpeedTableComponent />
    </GamePageLayout>
  );
};
