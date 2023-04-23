import { Card } from "@/models/card/card";
import { WarPlayer } from "@/models/player/warPlayer";
import React, { FC } from "react";
import { CardComponent } from "../../common/card/CardComponent";

export type WarPlayerComponentProps = {
  player: WarPlayer;
};

export const WarPlayerComponent: FC<WarPlayerComponentProps> = ({ player }) => {
  return (
    <div className="text-[#ffffff] ">
      <div className="flex items-center px-5 py-3 space-x-4 bg-[#000000] bg-opacity-50">
        <div className="text-center">
          <p>{player.name}</p>
          <p>Score</p>
          <p className="font-bold text-3xl">{player.score}</p>
        </div>
        {player._obtainedCards.length > 0 && (
          <CardComponent card={player.peekOfObtainedCards()} />
        )}
      </div>
    </div>
  );
};
