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
  onClick?: (data?: any) => void;
};
const hiddenImgUrl: string = "/cards/BACK.png";
export const CardComponent: FC<Props> = (props) => {
  const { card } = props;

  return (
    <div className="h-auto w-[35px] sm:w-[50px] md:w-[65px] lg:w-[75px]">
      {card.isOpen ? (
        <Image
          src={card.imgUrl}
          alt="picture"
          width={100}
          height={100}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      ) : (
        <Image
          src={hiddenImgUrl}
          alt="picture"
          width={100}
          height={100}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      )}
    </div>
  );
};
