import { BlackjackGamePhase } from "./../../../models/gamePhase/gamePhase";
import { useCallback } from "react";

import { useState } from "react";
import { BlackjackTable } from "@/models/table/table";
import { HandleBlackjackUserAction } from "@/components/games/blackjack/BlackjackActionSelectingArea";

export const useBlackJackState = () => {
  const [table, setTable] = useState<BlackjackTable>(new BlackjackTable());
  const [gamePhase, setGamePhase] = useState<BlackjackGamePhase>("Betting");
  const [isFirstRound, setIsFirstRound] = useState(true);
  const [isUserTurn, setIsUserTurn] = useState(false);

  // Userの名前をセット、ゲームを初期化して開始する
  const handleOnFirstLogin = useCallback((userName: string) => {
    setTable((table) => {
      table.setUserName(userName);
      table.initForNewGame();
      return table;
    });
  }, []);

  // userがbetを提出した時の関数. Bet可能であればそのままplayerActionに進む
  const handleClickBetSubmitBtn = useCallback((bet: number) => {
    if (bet === 0) {
      alert("Please make a bet");
      return;
    }
    if (table.isUserAbleToBet(bet)) {
      setTable((table) => {
        table.setUserBet(bet);
        table.makeAllAIInitialBet();
        return table;
      });
      setGamePhase("PlayerAction");
      allPlayersAction();
    } else {
      alert("Not enough amount of chips.");
      return;
    }
  }, []);

  // playerアクション時の関数。changeTurn()でターンを回す。changeTurnでプレー中のプレイヤーまで回しているので、currentPlayerがアクション終えてないかはチェックしない
  const allPlayersAction = useCallback((): void => {
    setTimeout(() => {
      // 直近のプレイヤー
      const currentPlayer = table.getPlayerOnTurn();
      console.log(currentPlayer);
      // playerがまだプレイしてるか確認.
      if (currentPlayer.isPlayerStillPlaying()) {
        // ターンがUSERのものであればIsUserTurn === trueにして終了
        if (currentPlayer.playerType === "USER") {
          setIsUserTurn(true);
          return;
        }
        // ターンがCPUの場合,isFirstRoundかどうかに分けてアクション実行
        else if (currentPlayer.playerType === "AI") {
          isFirstRound
            ? setTable((table) => {
                table.makeAIInitialAction(currentPlayer);
                return table;
              })
            : setTable((table) => {
                table.makeAIAction(currentPlayer);
                return table;
              });
        }
      }
      changeTurn();
    }, 2000);
  }, []);

  // ターンをプレー中のプレイヤーまで回す関数.(回す前に全プレイヤーがアクション終了しているかチェックし、終了していればhouseアクションに移る)
  const changeTurn = useCallback(() => {
    if (table.isOnTheLastPlayer() && isFirstRound) setIsFirstRound(false);
    // 終了していればhouseアクションに移る
    if (table.isAllPlayerActionDone()) {
      table.setHousePlaying();
      setGamePhase("HouseAction");
      houseAction();
    } else {
      // ターンを次のプレイヤーに回し、playerAction
      setTable((table) => {
        table.moveOnToNextPlayer();
        return table;
      });
      allPlayersAction();
    }
  }, []);

  // houseのアクション
  const houseAction = useCallback((): void => {
    setTable((table) => {
      table.makeHouseAction();
      table.setResultForAllPlayer();
      return table;
    });
    setGamePhase("Result");
  }, []);

  // userの４種類のアクション関数

  const handleClickUserHit = useCallback(() => {
    setTable((table) => {
      table.setPlayerHit(table.user);
      return table;
    });
    setIsUserTurn(false);
    changeTurn();
  }, []);

  const handleClickUserStand = useCallback(() => {
    setTable((table) => {
      table.setPlayerStand(table.user);
      return table;
    });
    setIsUserTurn(false);
    changeTurn();
  }, []);

  const handleClickUserDouble = useCallback(() => {
    setTable((table) => {
      table.setPlayerDouble(table.user);
      return table;
    });
    setIsUserTurn(false);
    changeTurn();
  }, []);

  const handleClickUserSurrender = useCallback(() => {
    setTable((table) => {
      table.setPlayerSurrender(table.user);
      return table;
    });
    setIsUserTurn(false);
    changeTurn();
  }, []);

  // userActionをまとめてexport
  const handleUserActions: HandleBlackjackUserAction = {
    hit: handleClickUserHit,
    stand: handleClickUserStand,
    double: handleClickUserDouble,
    surrender: handleClickUserSurrender,
  };

  const handleClickNextGameBtn = useCallback(() => {
    table.initForNewGame();
    setGamePhase("Betting");
    setIsFirstRound(true);
  }, []);

  return {
    table,
    gamePhase,
    isUserTurn,
    isFirstRound,
    handleOnFirstLogin,
    handleClickBetSubmitBtn,
    handleUserActions,
    handleClickNextGameBtn,
  };
};
