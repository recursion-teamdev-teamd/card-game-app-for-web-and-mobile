import { VanilaPlayer } from "@/models/player/abstractPlayer";
import { FC } from "react";
import { CardComponent } from "../card/CardComponent";

type Props = {
  player: VanilaPlayer;
};

export const PlayerNameAndHand: FC<Props> = ({ player }) => {
  return (
    <div>
      <p className="text-lg font-bold pb-1">{player.name}</p>
      <div className="flex space-x-3 justify-center">
        {player.hand.map((card, i) => (
          <div key={i}>
            <CardComponent card={card} />
          </div>
        ))}
      </div>
    </div>
  );
};
