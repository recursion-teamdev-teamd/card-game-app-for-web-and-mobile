import { BasicButton } from "@/components/common/ui/atoms/buttons/BasicButton";
import { BlackjackGamePhase } from "@/models/gamePhase/gamePhase";
import { BlackjackTable } from "@/models/table/table";
import Link from "next/link";
import { FC } from "react";
import { BlackjackUserActionComponent } from "./BlackjackUserActionComponent";

export type Props = {
  table: BlackjackTable;
  gamePhase: Exclude<BlackjackGamePhase, "Betting">;
  isUserTurn: boolean;
  isFirstRound: boolean;
  handleUserActions: HandleBlackjackUserAction;
  handleClickNextGameBtn: () => void;
};

export type HandleBlackjackUserAction = {
  hit: () => void;
  stand: () => void;
  double: () => void;
  surrender: () => void;
};

export const BlackjackActionSelectingArea: FC<Props> = ({
  table,
  gamePhase,
  isUserTurn,
  isFirstRound,
  handleUserActions,
  handleClickNextGameBtn,
}) => {
  return (
    <div className="flex justify-center pt-3 font-bold">
      {gamePhase === "PlayerAction" ? (
        isUserTurn ? (
          <BlackjackUserActionComponent
            isFirstRound={isFirstRound}
            handleUserActions={handleUserActions}
          />
        ) : (
          <p>{table.getPlayerOnTurn().name} is playing...</p>
        )
      ) : gamePhase === "HouseAction" ? (
        <p>House is Playing</p>
      ) : (
        <div className="text-center p-2 space-y-1">
          <p>
            {table.user.result === "Win"
              ? "You won the game!"
              : table.user.result === "Lose"
              ? "You lost the game"
              : table.user.result === "Game Over"
              ? "You lost and you don't have money anymore. Game over!"
              : "Draw!"}
          </p>
          {table.user.result === "Game Over" ? (
            <BasicButton
              buttonType="blue"
              mediaQueries="p-4"
              onClick={() => {}}
            >
              <Link href="/">Back Home</Link>
            </BasicButton>
          ) : (
            <BasicButton
              buttonType="blue"
              mediaQueries="p-4"
              onClick={() => handleClickNextGameBtn()}
            >
              Next Game
            </BasicButton>
          )}
        </div>
      )}
    </div>
  );
};
