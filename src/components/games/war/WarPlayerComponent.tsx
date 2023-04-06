import { Card } from "@/models/card/card";
import React from "react";
import { CardComponent } from "../../common/card/CardComponent";

export const WarPlayerComponent = () => {
  return (
    <div className="text-[#ffffff] ">
      <div className="flex items-center px-5 py-3 space-x-4 bg-[#000000] bg-opacity-50">
        <div className="text-center">
          <p>Score</p>
          <p className="font-bold text-3xl">1</p>
        </div>
        <CardComponent card={new Card("10", "C", true, "/cards/10-C.png")} />
      </div>
    </div>
  );
};
