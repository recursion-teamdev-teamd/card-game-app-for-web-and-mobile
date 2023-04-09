import { userState } from "@/globalState/userState";
import { useBlackJackState } from "@/hooks/games/blackjack/useBlackJackState";
import { useRouter } from "next/router";

import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { BettingPhaseComponent } from "../common/bet/BettingPhaseComponent";
import { GamePageLayout } from "../common/ui/layout/GamePageLayout";
import { BlackjackActionSelectingArea } from "../games/blackjack/BlackjackActionSelectingArea";
import { BlackJackTableComponent } from "../games/blackjack/BlackJackTableComponent";

export const BlackjackPage = () => {
  const {
    table,
    gamePhase,
    isUserTurn,
    isFirstRound,
    handleOnFirstLogin,
    handleClickBetSubmitBtn,
    handleUserActions,
    handleClickNextGameBtn,
  } = useBlackJackState();

  const { userName } = useRecoilValue(userState);
  // ページ初回読み込みでテーブルをセットアップ
  useEffect(() => {
    console.log("handleFirstLogin");
    handleOnFirstLogin(userName);
  }, [userName]);

  return (
    <GamePageLayout>
      {gamePhase == "Betting" ? (
        <BettingPhaseComponent
          handleClickBetSubmitBtn={handleClickBetSubmitBtn}
          chips={table.user.chips}
        />
      ) : (
        <div className="h-full w-full">
          <BlackJackTableComponent table={table} />
          <BlackjackActionSelectingArea
            table={table}
            gamePhase={gamePhase}
            isUserTurn={isUserTurn}
            isFirstRound={isFirstRound}
            handleUserActions={handleUserActions}
            handleClickNextGameBtn={handleClickNextGameBtn}
          />
        </div>
      )}
    </GamePageLayout>
  );
};
