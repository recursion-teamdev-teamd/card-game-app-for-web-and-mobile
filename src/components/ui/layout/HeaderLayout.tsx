import React, { FC, ReactNode } from "react";
import { Header } from "../molecules/Header";

type Props = {
  children: ReactNode;
};
export const HeaderLayout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
};
