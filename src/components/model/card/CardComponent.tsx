import { Card } from "@/models/card/card";
import Image from "next/image";
import React from "react";
import { FC } from "react";
import {
  AnimationControls,
  motion,
  TargetAndTransition,
  VariantLabels,
} from "framer-motion";

type Props = {
  card: Card;
  onClick?: (data?: any) => void;
  animate?: boolean | AnimationControls | TargetAndTransition | VariantLabels;
};
const hiddenImgUrl: string = "/cards/BACK.png";
export const CardComponent: FC<Props> = (props) => {
  const { card, onClick, animate } = props;

  return (
    <motion.div
      className="h-auto w-[35px] sm:w-[50px] md:w-[65px] lg:w-[75px]"
      onClick={onClick}
      animate={animate}
    >
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
    </motion.div>
  );
};
