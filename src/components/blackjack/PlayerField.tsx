import { Card } from "@/models/card/card";
import { v4 } from "uuid";
import Image from "next/image";
import { BlackjackPlayer } from "@/models/player/player";
import React from "react";
import { FC } from "react";
import { CardComponent } from "../model/card/CardComponent";
type Props = {
  player: BlackjackPlayer;
};
export const PlayerField: FC<Props> = (props) => {
  const { player } = props;
  const hiddenImgUrl: string = "/cards/BACK.png";

  return (
    <>
      <div>{player.name}</div>
      {player.hand.map((card) => {
        // return <CardComponent card={card} key={card.suit + card.rank} />;
        const key: string = v4().toString();
        return card.isOpen ? (
          <Image
            src={card.imgUrl}
            alt="picture"
            width={200}
            height={100}
            key={key}
          />
        ) : (
          <Image
            src={hiddenImgUrl}
            alt="picture"
            width={200}
            height={100}
            key={key}
          />
        );
      })}
    </>
  );
};
