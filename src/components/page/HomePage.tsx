import { gameInfoArray } from "@/models/gameInfo/gameInfo";
import React, { useCallback, useState } from "react";
import { GameShowCase } from "../common/ui/molecules/GameShowCase";
import { Header } from "../common/ui/organisms/Header";

export const HomePage = () => {
  const [userName, setUserName] = useState("User");

  const handleChangeUserNameInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
      setUserName(e.target.value);
    },
    []
  );
  return (
    <>
      <Header />
      <div className="absolute top-[8%]">
        <div className="w-full">
          <div className="text-center pt-6 pb-4">
            <p className="mb-1">ユーザネームを入力してください</p>
            <input
              type="text"
              placeholder=" Enter your name"
              value={userName}
              onChange={(e) => handleChangeUserNameInput(e)}
              className="w-3/4 p-2 bg-gray-200 text-gray-700 text-xl rounded-lg"
            />
          </div>
          <div className="w-full flex flex-wrap justify-center">
            {gameInfoArray.map((gameInfo) => (
              <div
                key={gameInfo.nameEn}
                className="w-full md:w-[30%] flex justify-center py-4"
              >
                <GameShowCase gameInfo={gameInfo} userName={userName} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
