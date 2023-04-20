import { Card } from "@/models/card/card";
import React, { FC } from "react";
import { RummyMeldCards } from "./RummyMeldCards";

type Props = {
  meldCards: Card[][];
  handleClickCards: () => void;
};

export const RummyMeldArea: FC<Props> = ({ meldCards, handleClickCards }) => {
  return (
    <div className="bg-[#4444] bg-opacity-20 outline w-full min-h-full">
      <div className="flex w-full h-full justify-start items-center flex-wrap">
        {meldCards.map((cards) => {
          return <RummyMeldCards cards={cards} key={cards[0].imgUrl} />;
        })}
      </div>
    </div>
  );
};
