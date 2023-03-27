import { useCustomMediaQuery } from "@/hooks/useCustomMediaQuery";
import { HeaderLink } from "../atoms/links/HeaderLink";

export const Header = () => {
  return (
    <div className="fixed z-[100] h-20 w-full rounded-lg shadow-lg">
      <div className="flex h-full w-full items-center justify-between px-4 xl:px-16">
        <div className="flex justify-center w-full">
          <HeaderLink
            href="/"
            mainText="TOP"
            subText="トップページへ戻る"
            mediaQueries="p-2"
          />
          <HeaderLink
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
          />
        </div>
      </div>
    </div>
  );
};
