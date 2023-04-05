import { CardComponent } from "@/components/common/card/CardComponent";
import { CardsOverLap } from "@/components/common/card/CardsOverLap";
import { Card } from "@/models/card/card";
import React from "react";
import { WarPlayerComponent } from "./WarPlayerComponent";

export const WarTableComponent = () => {
  return (
    <>
      <div className="relative h-[30%] w-full">
        <div className="absolute top-[50%] left-[10%] sm:left-[20%] md:left-[30%] lg:left-[40%]">
          <CardsOverLap
            cards={Array(26).fill(
              new Card("10", "C", false, "/cards/10-C.png")
            )}
            onClickCard={() => {}}
          />
        </div>
        <div className="absolute top-0 right-0">
          <WarPlayerComponent />
        </div>
      </div>
      <div className="relative h-[30%] w-full">
        <div className="absolute top-[20%] left-[45%] right-[45%] space-y-3 lg:flex lg:space-x-3">
          <CardComponent card={new Card("10", "C", true, "/cards/10-C.png")} />
          <CardComponent card={new Card("10", "C", true, "/cards/10-C.png")} />
        </div>
      </div>
      <div className="relative h-[30%] w-full">
        <div className="absolute top-[20%] left-[10%] sm:left-[20%] md:left-[30%] lg:left-[40%]">
          <CardsOverLap
            cards={Array(26).fill(
              new Card("10", "C", false, "/cards/10-C.png")
            )}
          />
        </div>
        <div className="absolute bottom-0 left-0">
          <WarPlayerComponent />
        </div>
      </div>
    </>
  );
};
