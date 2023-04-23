import { FC } from "react";
import React from "react";

import { GamblePlayerComponent } from "@/components/common/player/GamblePlayerComponent";
import { BlackjackTable } from "@/models/table/blackjackTable";
import { useCustomMediaQuery } from "@/hooks/common/useCustomMediaQuery";

type Props = {
  table: BlackjackTable;
};

export const BlackJackTableComponent: FC<Props> = ({ table }) => {
  return (
    <div className="xl:relative">
      <div className="flex justify-center">
        <GamblePlayerComponent player={table.house} />
      </div>
      <div className="w-full flex justify-between xl:justify-evenly px-3">
        {table.players.map((player) => {
          if (player.playerType === "AI")
            return <GamblePlayerComponent player={player} key={player.name} />;
        })}
      </div>
      <div className="flex justify-center xl:absolute xl:top-[43%] xl:left-[42%]">
        <GamblePlayerComponent player={table.user} />
      </div>
    </div>
  );
};
