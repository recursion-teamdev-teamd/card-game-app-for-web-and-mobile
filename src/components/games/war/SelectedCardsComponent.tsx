import { CardComponent } from "@/components/common/card/CardComponent";
import { Card } from "@/models/card/card";
import { FC } from "react";

type Props = { userSelectedCard: Card | null; cpuSelectedCard: Card | null };

export const SelectedCardsComponent: FC<Props> = ({
  userSelectedCard,
  cpuSelectedCard,
}) => {
  return (
    <div className="absolute top-[20%] left-[45%] right-[45%] space-y-3 lg:flex lg:space-x-3">
      {cpuSelectedCard && userSelectedCard && (
        <>
          <CardComponent card={cpuSelectedCard} />
          <CardComponent card={userSelectedCard} />
        </>
      )}
    </div>
  );
};
