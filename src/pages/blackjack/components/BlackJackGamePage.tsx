import { BlackjackTable } from "@/models/table/table";
import { BlackJackBetButtons } from "./BlackJackBetButtons";

import { FC, ReactNode } from "react";
import { BlackjackPlayer } from "@/models/player/player";
import { useState } from "react";

type Props = {};

export const BlackJackGamePage: FC<Props> = (props) => {
  const [user, setUser] = useState<BlackjackPlayer>(undefined);
  return (
    <>
      <div className="flex flex-wrap justify-center align-middle bg-sky-500 h-screen">
        <div className="w-screen text-center font-bold mt-3">
          click chips to bet
        </div>

        <BlackJackBetButtons />
      </div>
    </>
  );
};
