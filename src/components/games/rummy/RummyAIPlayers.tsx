import { RummyPlayer } from "@/models/player/rummyPlayer";
import { type } from "os";
import React, { FC } from "react";
import { RummyPlayerComponent } from "./RummyPlayerComponent";

type Props = {
  players: RummyPlayer[];
};

export const RummyAIPlayers: FC<Props> = ({ players }) => {
  return (
    <div className="flex justify-between items-center space-x-1 md:space-x-8">
      {players.map((player) => {
        return (
          player.playerType === "AI" && (
            <div className="px-3" key={player.id}>
              <RummyPlayerComponent player={player} disable={true} />
            </div>
          )
        );
      })}
    </div>
  );
};
