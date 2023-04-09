import { PlayerNameAndHand } from "@/components/common/player/PlayerNameAndHand";
import { BlackjackPlayer } from "@/models/player/player";
import { FC } from "react";

export type BlackjackPlayerComponentProps = {
  player: BlackjackPlayer;
};

export const BlackjackPlayerComponent: FC<BlackjackPlayerComponentProps> = ({
  player,
}) => {
  return (
    <div className="text-center outline-none p-3 md:p-8 shadow-lg rounded-lg shadow-[#000000]">
      <PlayerNameAndHand player={player} />
      <div className="pt-1 font-bold">
        <p>Status : {player.playerStatus}</p>
        {player.playerType !== "HOUSE" && (
          <>
            <p>Chip : {player.chips}</p>
            <p>Bet : {player.bet}</p>
          </>
        )}
      </div>
    </div>
  );
};
