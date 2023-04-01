import { Card } from "@/models/card/card";
import React from "react";
import { CardsOverLap } from "../model/card/CardsOverLap";
import { WarPlayerComponent } from "../model/player/war/WarPlayerComponent";
import { Header } from "../ui/organisms/Header";

export const WarPage = () => {
  return (
    <div className="">
      <Header />
      <div className="absolute top-[10%] w-full">
        <div className="bg-[#29870F] w-full">
          <div className="w-full flex justify-between sm:justify-around py-10">
            <div className="px-2">
              <CardsOverLap
                cards={Array(26).fill(
                  new Card("10", "C", false, "/cards/10-C.png")
                )}
              />
            </div>
            <div className="">
              <WarPlayerComponent />
            </div>
          </div>
          <div className="py-10">{/* Duel Space */}</div>
          <div className="w-full flex justify-between sm:justify-around py-10">
            <div className="px-2">
              <CardsOverLap
                cards={Array(26).fill(
                  new Card("10", "C", false, "/cards/10-C.png")
                )}
              />
            </div>
            <div className="">
              <WarPlayerComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
