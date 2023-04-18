import { CardsOverlapComponent } from "@/components/common/card/CardsOverlapComponent";
import { Card } from "@/models/card/card";
import React, { FC } from "react";

type Props = {
  cards: Card[];
};

export const RummyMeldCards: FC<Props> = ({ cards }) => {
  return (
    <div className="m-6">
      <CardsOverlapComponent cards={cards} />
    </div>
  );
};
