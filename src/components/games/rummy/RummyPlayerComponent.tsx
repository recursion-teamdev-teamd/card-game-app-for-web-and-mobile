import { HandCardsComponent } from "@/components/common/card/HandCardsComponent";
import { RummyPlayer } from "@/models/player/rummyPlayer";
import React, { FC } from "react";

type Props = {
  player: RummyPlayer;
  disable: boolean;
};

export const RummyPlayerComponent: FC<Props> = ({ player, disable }) => {
  return (
    <div className="text-center space-y-2">
      <HandCardsComponent cards={player.hand} disable={disable} />
      <div className="flex justify-center">
        <div className="bg-[#4444] bg-opacity-20  text-[#ffffff] text-center font-semibold py-1 px-2 min-w-[120px] outline">
          <p>{player.name + " : " + player.score}</p>
        </div>
      </div>
    </div>
  );
};
