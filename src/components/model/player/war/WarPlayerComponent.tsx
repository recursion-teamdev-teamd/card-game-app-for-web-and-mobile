import { Card } from "@/models/card/card";
import React from "react";
import { CardComponent } from "../../card/CardComponent";

export const WarPlayerComponent = () => {
  return (
    <div className="text-[#ffffff] ">
      <p>Player</p>
      <div className="flex px-5 py-3 bg-[#000000] bg-opacity-50">
        <p className="font-bold text-lg">1</p>
        <CardComponent card={new Card("10", "C", true, "/cards/10-C.png")} />
      </div>
    </div>
  );
};
