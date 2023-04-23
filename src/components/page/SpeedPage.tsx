import React from "react";
import { GamePageLayout } from "../common/ui/layout/GamePageLayout";
import {
  SpeedTableComponent,
  SpeedTableComponentProps,
} from "../games/speed/SpeedTableComponent";

export const SpeedPage: React.FC<SpeedTableComponentProps> = (props) => {
  const {
    speedTable,
    handleClickCard,
    cardsInStrages,
    handleClickCardInStrages,
    hancleClickGameStartBtn,
    hancleClickGameReStartBtn,
    executeHouseAction,
  } = props;

  const SpeedTableComponentProps = {
    speedTable,
    handleClickCard,
    cardsInStrages,
    handleClickCardInStrages,
    hancleClickGameStartBtn,
    hancleClickGameReStartBtn,
    executeHouseAction,
  };
  return (
    <GamePageLayout>
      <SpeedTableComponent {...SpeedTableComponentProps} />
    </GamePageLayout>
  );
};
