import React, { useEffect } from "react";
import { GamePageLayout } from "../common/ui/layout/GamePageLayout";
import { WarTableComponent } from "../games/war/WarTableComponent";

import { useWarState } from "@/hooks/games/war/useWarState";
import { useRecoilValue } from "recoil";
import { userState } from "@/globalState/userState";

export const WarPage = () => {
  const {
    table,
    gamePhase,
    handleOnFirstLogin,
    handleClickCard,
    handleClickNextGame,
    checkIfGameIsOver,
  } = useWarState();
  const { userName } = useRecoilValue(userState);

  useEffect(() => {
    handleOnFirstLogin(userName);
  }, []);

  useEffect(() => {
    checkIfGameIsOver();
  }, [gamePhase]);

  return (
    <GamePageLayout>
      <WarTableComponent
        table={table}
        handleClickCard={handleClickCard}
        gamePhase={gamePhase}
        handleClickNextGame={handleClickNextGame}
      />
    </GamePageLayout>
  );
};
