import { Card } from "@/models/card/card";
import Image from "next/image";
import React, { FC } from "react";

type Props = {
  card: Card;
};
const hiddenImgUrl: string = "/cards/BACK.png";
export const DisabledCardComponent: FC<Props> = ({ card }) => {
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
