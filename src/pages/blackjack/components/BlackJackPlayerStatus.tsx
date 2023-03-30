import React from "react";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const baseStyle = "rounded-md items-center font-bold";

export const BasicButton: FC<Props> = (props) => {
  const { children } = props;
  return <div className={baseStyle}>{children}</div>;
};
