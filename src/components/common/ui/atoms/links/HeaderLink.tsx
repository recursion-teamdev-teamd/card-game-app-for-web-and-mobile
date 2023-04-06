import Link from "next/link";
import React, { FC } from "react";

type Props = {
  href: string;
  mainText: string;
  subText?: string;
  // color: "green" | "red" | "yellow" | "black" | "blue" | "gray";
  mediaQueries: string;
};

// const colorMap = new Map<string, string>([
//     ["green", "bg-[#28A745] text-[#ffffff]"],
//     ["red", "bg-[#DC3444] text-[#ffffff]"],
//     ["yellow", "bg-[#F8BA03]"],
//     ["black", "bg-[#000000] text-[#ffffff]"],
//     ["blue", "bg-[#017BFE] text-[#ffffff]"],
//     ["gray","bg-[#EBF0F5]"]
//   ]);

const baseStyle = "text-center transition hover:duration-500 hover:opacity-50";

export const HeaderLink: FC<Props> = (props) => {
  const { href, mainText, subText, mediaQueries } = props;

  return (
    <div className={`${baseStyle} ${mediaQueries}`}>
      <Link href={href}>
        <p className="text-lg">{mainText}</p>
        <p className="text-sm">{subText}</p>
      </Link>
    </div>
  );
};
