import { Card } from "@/models/card/card";
import { motion, useAnimationControls } from "framer-motion";
import React from "react";
import { CardComponent } from "../common/card/CardComponent";
import { CardsOverLap } from "../common/card/CardsOverLap";
import { WarPlayerComponent } from "../games/war/WarPlayerComponent";
import { GamePageLayout } from "../common/ui/layout/GamePageLayout";
import { WarTableComponent } from "../games/war/WarTableComponent";

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
    <GamePageLayout>
      <WarTableComponent />
    </GamePageLayout>
  );
};
