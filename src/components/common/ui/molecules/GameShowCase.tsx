import { userState } from "@/globalState/userState";
import { GameInfo } from "@/models/gameInfo/gameInfo";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { BasicButton } from "../atoms/buttons/BasicButton";

type Props = {
  gameInfo: GameInfo;
  userName: string;
};

export const GameShowCase: FC<Props> = ({ gameInfo, userName }) => {
  const setUserState = useSetRecoilState(userState);
  const router = useRouter();

  const handleClickGameStartBtn = () => {
    setUserState((userState) => {
      return {
        userName,
        userChip: userState.userChip,
        difficulty: userState.difficulty,
      };
    });
    router.push(gameInfo.pathname);
  };

  return (
    <div className="w-[325px] border-2 rounded-lg  text-center ease-in-out duration-200 hover:translate-x-2 hover:-translate-y-2">
      <div className="pt-3 pb-1">
        <h2 className="text-xl font-bold">{gameInfo.nameEn}</h2>
        <p className="text-xs">{gameInfo.nameJa}</p>
      </div>

      <div className="flex justify-center h-[40%] pt-2 pb-4">
        <div className="w-[50%]">
          <p className="p-2 text-sm">{gameInfo.descriptionJa}</p>
        </div>
      </div>

      <div className="flex justify-center py-4 space-x-2">
        {gameInfo.isPublic ? (
          <BasicButton
            buttonType="blue"
            mediaQueries="p-2"
            onClick={() => handleClickGameStartBtn()}
          >
            Start
          </BasicButton>
        ) : (
          <BasicButton
            buttonType="black"
            mediaQueries="p-2"
            onClick={() => router.push("/")}
          >
            製作中...
          </BasicButton>
        )}

        {/* <BasicButton buttonType="blue" mediaQueries="p-2" onClick={() => {}}>
          easy
        </BasicButton>
        <BasicButton buttonType="yellow" mediaQueries="p-2" onClick={() => {}}>
          medium
        </BasicButton>
        <BasicButton buttonType="red" mediaQueries="p-2" onClick={() => {}}>
          hard
        </BasicButton> */}
      </div>
    </div>
  );
};
