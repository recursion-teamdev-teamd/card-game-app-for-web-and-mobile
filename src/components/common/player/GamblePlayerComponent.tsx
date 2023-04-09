import { PlayerNameAndHand } from "@/components/common/player/PlayerNameAndHand";
import { GamblePlayer } from "@/models/player/abstractPlayer";
import { FC } from "react";

type GamblePlayerComponentProps = {
  player: GamblePlayer;
};

export const GamblePlayerComponent: FC<GamblePlayerComponentProps> = ({
  player,
}) => {
  return (
    <div className="text-center outline-none p-3 md:p-8 shadow-lg rounded-lg shadow-[#000000]">
      <PlayerNameAndHand player={player} />
      <div className="pt-1 font-bold">
        {player.playerType !== "HOUSE" ? (
          <>
            <p>Status : {player.playerStatus}</p>
            <p>Chip : {player.chips}</p>
            <p>Bet : {player.bet}</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
