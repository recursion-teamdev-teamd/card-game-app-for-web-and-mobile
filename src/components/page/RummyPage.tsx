import { userState } from "@/globalState/userState";
import { useRummyState } from "@/hooks/games/rummy/useRummyState";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { GamePageLayout } from "../common/ui/layout/GamePageLayout";
import { RummyTableComponent } from "../games/rummy/RummyTableComponent";

export const RummyPage = () => {
  const { table, isUserTurn, handleOnFirstLogin, allPlayersAction } =
    useRummyState();

  const { userName } = useRecoilValue(userState);
  // ページ初回読み込みでテーブルをセットアップ
  useEffect(() => {
    console.log("handleFirstLogin");
    handleOnFirstLogin(userName);
    allPlayersAction();
  }, [userName]);

  return (
    <GamePageLayout>
      <RummyTableComponent table={table} isUserTurn={isUserTurn} />
    </GamePageLayout>
  );
};
