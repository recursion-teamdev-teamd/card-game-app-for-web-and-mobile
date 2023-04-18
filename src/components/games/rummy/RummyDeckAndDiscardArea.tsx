import { CardComponent } from "@/components/common/card/CardComponent";
import { DisabledCardComponent } from "@/components/common/card/DisabledCardComponent";
import { Card } from "@/models/card/card";
import { RummyTable } from "@/models/table/rummyTable";
import React, { FC } from "react";

type Props = {
  isUserTurn: boolean;
  table: RummyTable;
};

export const RummyDeckAndDiscardArea: FC<Props> = ({ isUserTurn, table }) => {
  const card = table.peekOfDiscardArea()
    ? table.peekOfDiscardArea()
    : new Card("10", "C", false, "/cards/10-C.png");
  return (
    <div className="flex items-center justify-center space-x-2">
      {isUserTurn ? (
        <CardComponent card={new Card("10", "C", false, "/cards/10-C.png")} />
      ) : (
        <DisabledCardComponent
          card={new Card("10", "C", false, "/cards/10-C.png")}
        />
      )}
      {isUserTurn ? (
        <CardComponent card={card} />
      ) : (
        <DisabledCardComponent card={card} />
      )}
    </div>
  );
};
