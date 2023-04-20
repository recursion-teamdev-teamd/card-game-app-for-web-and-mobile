import { RummyTable } from "@/models/table/rummyTable";
import React, { useCallback, useState } from "react";
import _ from "lodash";
import { RummyPlayer } from "@/models/player/rummyPlayer";

export const useRummyState = () => {
  const [table, setTable] = useState(new RummyTable());
  const [isUserTurn, setIsUserTurn] = useState(false);

  // Userの名前をセット、ゲームを初期化して開始する
  const handleOnFirstLogin = useCallback((userName: string) => {
    setTable((table) => {
      const newTable = _.cloneDeep(table);
      newTable.setUserName(userName);
      newTable.initForNewRound();
      return newTable;
    });
    setTimeout(() => {
      setTable((table) => {
        const newTable = _.cloneDeep(table);
        newTable.assignPlayersHand();
        return newTable;
      });
    }, 1000);
  }, []);

  // playerアクション時の関数。changeTurn()でターンを回す。changeTurnでプレー中のプレイヤーまで回しているので、currentPlayerがアクション終えてないかはチェックしない
  const allPlayersAction = useCallback((): void => {
    setTimeout(() => {
      // 直近のプレイヤー
      const currentPlayer = table.getPlayerOnTurn();
      console.log(currentPlayer);

      // ターンがUSERのものであればIsUserTurn === trueにして終了
      if (currentPlayer.playerType === "USER") {
        setIsUserTurn(true);
        return;
      }
      // ターンがCPUの場合,isFirstRoundかどうかに分けてアクション実行
      else if (currentPlayer.playerType === "AI") {
        aiAction(currentPlayer);
      }
      if (currentPlayer.isRoundOver()) {
        // resultfunc()
        alert("roundOver!");
      } else changeTurn();
    }, 2000);
  }, []);

  // ターンをプレー中のプレイヤーまで回す関数.(回す前に全プレイヤーがアクション終了しているかチェックし、終了していればhouseアクションに移る)
  const changeTurn = useCallback(() => {
    // ターンを次のプレイヤーに回し、playerAction
    setTable((table) => {
      const newTable = _.cloneDeep(table);
      newTable.moveOnToNextPlayer();
      return newTable;
    });
    allPlayersAction();
  }, []);

  const aiActionDrawACard = useCallback((player: RummyPlayer): void => {
    setTable((table) => {
      const newTable = _.cloneDeep(table);
      newTable.aiActionDrawACard(player);
      return newTable;
    });
  }, []);

  const aiActionMeld = useCallback((player: RummyPlayer): void => {
    setTable((table) => {
      const newTable = _.cloneDeep(table);
      newTable.aiActionMeld(player);
      return newTable;
    });
  }, []);

  const aiActionAddToExsitingPair = useCallback((player: RummyPlayer): void => {
    setTable((table) => {
      const newTable = _.cloneDeep(table);
      newTable.aiActionAddToExsitingPair(player);
      return newTable;
    });
  }, []);
  const aiActionDiscard = useCallback((player: RummyPlayer): void => {
    setTable((table) => {
      const newTable = _.cloneDeep(table);
      newTable.aiActionDiscard(player);
      return newTable;
    });
  }, []);

  const aiAction = useCallback((player: RummyPlayer) => {
    console.log(`${player.name} aiAction`);
    setTimeout(() => {
      aiActionDrawACard(player);
    }, 500);
    setTimeout(() => {
      aiActionMeld(player);
    }, 1000);
    setTimeout(() => {
      aiActionAddToExsitingPair(player);
    }, 1500);
    setTimeout(() => {
      aiActionDiscard(player);
    }, 2000);
  }, []);

  return { table, isUserTurn, handleOnFirstLogin, allPlayersAction };
};
