import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  buttonType: "green" | "red" | "yellow" | "black" | "blue";
  mediaQueries: string;
  onClick: (e?: any) => void;
};

const buttonTypeMap = new Map<string, string>([
  ["green", "bg-[#28A745] text-[#ffffff]"],
  ["red", "bg-[#DC3444] text-[#ffffff]"],
  ["yellow", "bg-[#F8BA03]"],
  ["black", "bg-[#000000] text-[#ffffff]"],
  ["blue", "bg-[#017BFE] text-[#ffffff]"],
]);

const baseStyle =
  "rounded-md items-center font-bold transition hover:duration-500 hover:bg-opacity-80";

export const BasicButton: FC<Props> = (props) => {
  const { children, buttonType, mediaQueries, onClick } = props;
  return (
    <button
      className={`${baseStyle} , ${buttonTypeMap.get(
        buttonType
      )} ${mediaQueries} `}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};
