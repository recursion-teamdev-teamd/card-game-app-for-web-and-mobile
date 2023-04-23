import { Card } from "@/models/card/card";
import React, { FC } from "react";
import { CardComponent } from "./CardComponent";
import { DisabledCardComponent } from "./DisabledCardComponent";

type Props = {
  cards: Card[];
  handleClickCard?: (index: number) => void;
  disable: boolean;
};

export const HandCardsComponent: FC<Props> = ({
  cards,
  handleClickCard,
  disable,
}) => {
  const baseStyle = disable
    ? ""
    : "cursor-pointer hover:translate-y-3 duration-100";
  return (
    <div className="relative">
      {cards.map((card, i) => {
        const style = `absolute top-0 left-[${i * 10}px] ${baseStyle} `;
        return i === 0 ? (
          <div key={i} className={baseStyle}>
            {disable ? (
              <DisabledCardComponent card={card} />
            ) : (
              <CardComponent
                card={card}
                onClick={() => handleClickCard && handleClickCard(i)}
              />
            )}
          </div>
        ) : (
          <div key={i} className={style}>
            {disable ? (
              <DisabledCardComponent card={card} />
            ) : (
              <CardComponent
                card={card}
                onClick={() => handleClickCard && handleClickCard(i)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
