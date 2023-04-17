import { Card } from "@/models/card/card";
import React, { FC } from "react";
import { CardComponent } from "../../common/card/CardComponent";
import { WarPlayer } from "@/models/player/player";

export type WarPlayerComponentProps = {
  player: WarPlayer;
};

export const WarPlayerComponent: FC<WarPlayerComponentProps> = ({ player }) => {
  return (
    <div className="text-[#ffffff] ">
      <div className="flex items-center px-5 py-3 space-x-4 bg-[#000000] bg-opacity-50">
        <div className="text-center">
          <p>Score</p>
          <p className="font-bold text-3xl">{player.score}</p>
        </div>
        <CardComponent card={new Card("10", "C", false, "/cards/10-C.png")} />
      </div>
    </div>
  );
};
