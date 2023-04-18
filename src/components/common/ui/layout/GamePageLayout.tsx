import React, { FC, ReactNode } from "react";
import { Header } from "../organisms/Header";

type Props = {
  children: ReactNode;
};

export const GamePageLayout: FC<Props> = ({ children }) => {
  return (
    <div className="h-full w-full bg-[#29870F]">
      <Header />
      <div className="absolute top-[10%] w-screen h-full">
        <div className="w-full h-full bg-[#29870F]">{children}</div>
      </div>
    </div>
  );
};
