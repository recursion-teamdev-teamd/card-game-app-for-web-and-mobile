import { Card } from "@/models/card/card";
import { motion, useAnimationControls } from "framer-motion";
import React from "react";
import { CardComponent } from "../model/card/CardComponent";
import { CardsOverLap } from "../model/card/CardsOverLap";
import { WarPlayerComponent } from "../model/player/war/WarPlayerComponent";
import { Header } from "../ui/organisms/Header";

export const WarPage = () => {
  const controls = useAnimationControls();
  const handleClick = () => {
    alert("clicked");
    // Define the animation properties
    const animationProps = {
      x: 100,
      y: 100,
      rotate: 360,
      transition: { duration: 0.5 },
    };

    motion.animate(animationProps);
  };

  return (
    <div className="h-full w-full bg-[#29870F]">
      <Header />
      <div className="absolute top-[10%] w-full h-full">
        <div className="w-full h-full  bg-[#29870F]">
          <div className="relative h-[30%] w-full">
            <div className="absolute top-[50%] left-[10%] sm:left-[20%] md:left-[30%] lg:left-[40%]">
              <CardsOverLap
                cards={Array(26).fill(
                  new Card("10", "C", false, "/cards/10-C.png")
                )}
                onClickCard={handleClick}
              />
            </div>
            <div className="absolute top-0 right-0">
              <WarPlayerComponent />
            </div>
          </div>
          <div className="relative h-[30%] w-full">
            <div className="absolute top-[20%] left-[45%] right-[45%] space-y-3 lg:flex lg:space-x-3">
              <CardComponent
                card={new Card("10", "C", true, "/cards/10-C.png")}
              />
              <CardComponent
                card={new Card("10", "C", true, "/cards/10-C.png")}
              />
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
        </div>
      </div>
    </div>
  );
};
