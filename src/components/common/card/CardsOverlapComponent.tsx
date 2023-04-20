import { Card } from "@/models/card/card";
import React, { FC } from "react";
import { CardComponent } from "./CardComponent";

type Props = {
  cards: Card[];
  onClickCards?: (data?: any) => void;
};

export const CardsOverlapComponent: FC<Props> = ({ cards, onClickCards }) => {
  return (
    <div
      className="relative cursor-pointer hover:translate-y-1 duration-100"
      onClick={onClickCards}
    >
      {cards.map((card, i) => {
        const style = `absolute top-0 left-[${i * 10}px]`;
        return i === 0 ? (
          <div key={i}>
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
