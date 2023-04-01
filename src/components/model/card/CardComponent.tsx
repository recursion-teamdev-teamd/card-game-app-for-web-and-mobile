import { Card } from "@/models/card/card";
import Image from "next/image";
import React from "react";
import { FC } from "react";
import {
  BsFillSuitClubFill,
  BsFillSuitDiamondFill,
  BsFillSuitHeartFill,
  BsFillSuitSpadeFill,
} from "react-icons/bs";
import { GiClown } from "react-icons/gi";

type Props = {
  card: Card;
  onClick: (data?: any) => void;
};

export const CardComponent: FC<Props> = (props) => {
  const { card } = props;
  const hiddenImgUrl: string = "/cards/BACK.png";
  return (
    <div className="bg-[#ffffff] rounded-sm text-center p-2">
      {card.isOpen ? (
        <div>
          <Image src={card.imgUrl} alt="picture" />
        </div>
      ) : (
        <Image src={hiddenImgUrl} alt="picture" />
      )}
    </div>
  );
};
