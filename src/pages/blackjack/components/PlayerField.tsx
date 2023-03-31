import { Card } from "@/models/card/card";
import Image from "next/image";
import { BlackjackPlayer } from "@/models/player/player";
import React from "react";
import { FC } from "react";

type Props = {
  player: BlackjackPlayer;
};

type CardComponentProps = { card: Card; width: number; height: number };

const CardComponent: FC<CardComponentProps> = (props) => {
  const { card, width, height } = props;
  const hiddenImgUrl: string = "/cards/BACK.png";
  return (
    <div className="">
      {card.isOpen ? (
        <Image src={card.imgUrl} alt="picture" width={width} height={height} />
      ) : (
        <Image src={hiddenImgUrl} alt="picture" width={width} height={height} />
      )}
    </div>
  );
};

export const PlayerField: FC<Props> = (props) => {
  const { player } = props;
  const CardComponentPropsDefault = {
    card: new Card("Joker", "Joker", true, "/cards/JOKER.png"),
    width: 100,
    height: 100,
  };
  return (
    <div>
      <div>{player.getName()}</div>
      {player.getHand().forEach((card) => {
        <CardComponent {...(CardComponentPropsDefault, card)} />;
      })}
    </div>
  );
};
