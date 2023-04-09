import { BasicButton } from "@/components/common/ui/atoms/buttons/BasicButton";
import { BlackjackGamePhase } from "@/models/gamePhase/gamePhase";
import { FC } from "react";
import { HandleBlackjackUserAction } from "./BlackjackActionSelectingArea";

export type Props = {
  isFirstRound: boolean;
  handleUserActions: HandleBlackjackUserAction;
};

export const BlackjackUserActionComponent: FC<Props> = ({
  isFirstRound,
  handleUserActions,
}) => {
  return (
    <div className="text-center space-y-2 py-2">
      <p className="font-bold">Your turn!</p>
      <div className="flex justify-center space-x-3">
        {isFirstRound ? (
          <BasicButton
            buttonType="yellow"
            mediaQueries="py-2 px-1 md:py-3 md:px-2"
            onClick={handleUserActions.double}
          >
            Double
          </BasicButton>
        ) : (
          <></>
        )}
        <BasicButton
          buttonType="red"
          mediaQueries="py-2 px-4 md:py-3 md:px-6"
          onClick={handleUserActions.hit}
        >
          Hit
        </BasicButton>
        <BasicButton
          buttonType="blue"
          mediaQueries="p-2 md:p-3"
          onClick={handleUserActions.stand}
        >
          Stand
        </BasicButton>
        <BasicButton
          buttonType="green"
          mediaQueries="py-2 px-1 md:py-3 md:px-4"
          onClick={handleUserActions.surrender}
        >
          Surrender
        </BasicButton>
      </div>
    </div>
  );
};
