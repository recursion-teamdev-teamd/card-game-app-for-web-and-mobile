import React from "react";
import { GamePageLayout } from "../common/ui/layout/GamePageLayout";
import { SpeedTableComponent } from "../games/speed/SpeedTableComponent";

type Props = {
  speedTable;
  handleClickCard;
  cardsInStrages;
  handleClickCardInStrages;
  hancleClickGameStartBtn;
  hancleClickGameReStartBtn;
  executeHouseAction;
};
export const SpeedPage: React.FC<Props> = (props) => {
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
