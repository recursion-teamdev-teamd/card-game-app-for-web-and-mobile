import { useCustomMediaQuery } from "@/hooks/common/useCustomMediaQuery";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { HeaderLink } from "../atoms/links/HeaderLink";
import { TitleLogo } from "../atoms/logos/TitleLogo";

export const Header = () => {
  const { isMoreThanMd } = useCustomMediaQuery();

  return (
    <div className="fixed h-[10%] bg-white text-[#000000] top-0 z-[100] w-full rounded-sm shadow-sm p-4 md:p-0">
      <div className="h-full w-full flex items-center justify-between md:justify-start">
        <div className="pl-3 hover:opacity-50 hover:duration-500 cursor-pointer">
          <Link href={"/"}>
            <TitleLogo />
          </Link>
        </div>
        {isMoreThanMd ? (
          <div className="flex">
            <HeaderLink
              href="/"
              mainText="TOP"
              subText="トップページへ戻る"
              mediaQueries="p-2"
            />
            {/* <HeaderLink
              href="/rules"
              mainText="RULES"
              subText="ルールを見る"
              mediaQueries="p-2"
            />
            <HeaderLink
              href="/"
              mainText="CONTACT"
              subText="ご連絡はこちら"
              mediaQueries="p-2"
            /> */}
          </div>
        ) : (
          <div>
            {/* <div className="hover:opacity-50 hover:duration-500 cursor-pointer">
              <GiHamburgerMenu size={23} />
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};
