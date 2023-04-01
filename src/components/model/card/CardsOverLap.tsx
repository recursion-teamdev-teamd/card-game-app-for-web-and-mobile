import { Card } from "@/models/card/card";
import React, { FC } from "react";
import { CardComponent } from "./CardComponent";

type Props = {
  cards: Card[];
};

export const CardsOverLap: FC<Props> = (props) => {
  const { cards } = props;
  return (
    <div className="relative">
      {cards.map((card, i) => {
        const style = `absolute top-0 left-[${
          i * 10
        }px] cursor-pointer hover:translate-y-3 duration-300`;
        return i === 0 ? (
          <div
            key={i}
            className="cursor-pointer hover:translate-y-3 duration-200"
          >
            <CardComponent card={card} />
          </div>
        ) : (
          <div key={i} className={style}>
            <CardComponent card={card} />
          </div>
        );
      })}
    </div>
  );
};
