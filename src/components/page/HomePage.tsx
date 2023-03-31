import { gameInfoArray } from "@/models/gameInfo/gameInfo";
import React from "react";
import { GameShowCase } from "../ui/molecules/GameShowCase";
import { Header } from "../ui/organisms/Header";

export const HomePage = () => {
  return (
    <>
      <Header />
      <div className="absolute top-[8%]">
        <div className="w-full">
          {/* <div className="m-2.5">
            <p className="mb-1">ユーザネームを入力してください</p>
            <input
              type="text"
              placeholder=" Enter your name"
              className="w-3/4 p-2 bg-gray-200 text-gray-700 text-xl rounded-lg"
            />
          </div> */}
          <div className="w-full flex flex-wrap justify-center">
            {gameInfoArray.map((gameInfo) => (
              <div
                key={gameInfo.nameEn}
                className="w-full md:w-[30%] flex justify-center py-4"
              >
                <GameShowCase gameInfo={gameInfo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
