import { BasicButton } from "@/components/ui/atoms/buttons/BasicButton";
import Head from "next/head";
import React from "react";
import { HeaderLayout } from "../ui/layout/HeaderLayout";
import { HeaderOrModalLayout } from "../ui/layout/HeaderOrModalLayout";

export const HomePage = () => {
  return (
    <HeaderOrModalLayout>
      <h1 className="p-20 text-center text-5xl">Card Game</h1>
      <div className="grid gap-2 grid-cols-2">
        <div className="flex justify-center items-center">
          <img
            src="https://1.bp.blogspot.com/-NqINaKoqjYo/Udy6sX8IbMI/AAAAAAAAWLY/6pctzDBK0pU/s800/game_cards.png"
            alt="ゲームの画像"
            className="w-80"
          />
        </div>
        <div>
          <div className="m-2.5">
            <p className="mb-1">ユーザネームを入力してください</p>
            <input
              type="text"
              placeholder=" Enter your name"
              className="w-3/4 p-2 bg-gray-200 text-gray-700 text-xl rounded-lg"
            />
          </div>
          <div className="overflow-y-auto h-[500px] flex flex-wrap mt-5">
            <div className="border-2 w-[265px] m-2 mt-3 rounded-lg ease-in-out duration-200 hover:translate-x-2 hover:-translate-y-2">
              <h2 className="text-center text-xl">Blackjack</h2>
              <p className="text-center text-xs">ブラックジャック</p>
              <p className="p-2 text-sm">
                手札の合計値を21に近づけるゲームです。21を超えないように気をつけましょう。
              </p>
              <div className="p-2 flex justify-center">
                <BasicButton
                  buttonType="yellow"
                  mediaQueries="p-2"
                  onClick={() => {}}
                >
                  easy
                </BasicButton>
                <button className="p-1 ml-5 mr-5 bg-yellow-200 bg-opacity-50 rounded hover:bg-yellow-300">
                  medium
                </button>
                <button className="p-1 bg-red-200 bg-opacity-50 rounded hover:bg-red-300">
                  hard
                </button>
              </div>
            </div>
            <div className="border-2 w-[265px] m-2 rounded-lg ease-in-out duration-200 hover:translate-x-2 hover:-translate-y-2">
              <h2 className="text-center text-xl">Rummy</h2>
              <p className="text-center text-xs">ラミー</p>
              <p className="p-2 text-sm">
                連続した数字のカードを揃えるゲームです。頭を使いましょう。記憶力も大事です。
              </p>
              <div className="p-2 flex justify-center">
                <button className="p-1 bg-blue-200 bg-opacity-50 rounded hover:bg-blue-300">
                  easy
                </button>
                <button className="p-1 ml-5 mr-5 bg-yellow-200 bg-opacity-50 rounded hover:bg-yellow-300">
                  medium
                </button>
                <button className="p-1 bg-red-200 bg-opacity-50 rounded hover:bg-red-300">
                  hard
                </button>
              </div>
            </div>
            <div className="border-2 w-[265px] m-2 rounded-lg ease-in-out duration-200 hover:translate-x-2 hover:-translate-y-2">
              <h2 className="text-center text-xl">War</h2>
              <p className="text-center text-xs">戦争</p>
              <p className="p-2 text-sm">
                相手のカードよりも強いカードを出すと勝つゲームです。運ゲー？
              </p>
              <div className="p-2 flex justify-center">
                <button className="p-1 bg-blue-200 bg-opacity-50 rounded hover:bg-blue-300">
                  easy
                </button>
                <button className="p-1 ml-5 mr-5 bg-yellow-200 bg-opacity-50 rounded hover:bg-yellow-300">
                  medium
                </button>
                <button className="p-1 bg-red-200 bg-opacity-50 rounded hover:bg-red-300">
                  hard
                </button>
              </div>
            </div>
            <div className="border-2 w-[265px] m-2 rounded-lg ease-in-out duration-200 hover:translate-x-2 hover:-translate-y-2">
              <h2 className="text-center text-xl">Speed</h2>
              <p className="text-center text-xs">スピード</p>
              <p className="p-2 text-sm">
                手札から素早く台札の上にカードを乗せるゲームです。相手より早く手札をなくしましょう。
              </p>
              <div className="p-2 flex justify-center">
                <button className="p-1 bg-blue-200 bg-opacity-50 rounded hover:bg-blue-300">
                  easy
                </button>
                <button className="p-1 ml-5 mr-5 bg-yellow-200 bg-opacity-50 rounded hover:bg-yellow-300">
                  medium
                </button>
                <button className="p-1 bg-red-200 bg-opacity-50 rounded hover:bg-red-300">
                  hard
                </button>
              </div>
            </div>
            <div className="border-2 w-[265px] m-2 rounded-lg ease-in-out duration-200 hover:translate-x-2 hover:-translate-y-2">
              <h2 className="text-center text-xl">Poker</h2>
              <p className="text-center text-xs">ポーカー</p>
              <p className="p-2 text-sm">
                5枚の手札で役を作るゲームです。どのような役で勝負するかはあなた次第です。
              </p>
              <div className="p-2 flex justify-center">
                <button className="p-1 bg-blue-200 bg-opacity-50 rounded hover:bg-blue-300">
                  easy
                </button>
                <button className="p-1 ml-5 mr-5 bg-yellow-200 bg-opacity-50 rounded hover:bg-yellow-300">
                  medium
                </button>
                <button className="p-1 bg-red-200 bg-opacity-50 rounded hover:bg-red-300">
                  hard
                </button>
              </div>
            </div>
            <div className="border-2 w-[265px] m-2 rounded-lg ease-in-out duration-200 hover:translate-x-2 hover:-translate-y-2">
              <h2 className="text-center text-xl">Texas Holdem Poker</h2>
              <p className="text-center text-xs">テキサスポーカー</p>
              <p className="p-2 text-sm">
                自分の手札とディーラーの手札の組み合わせで役を作るゲームです。ただの運ゲーではありません。
              </p>
              <div className="p-2 flex justify-center">
                <button className="p-1 bg-blue-200 bg-opacity-50 rounded hover:bg-blue-300">
                  easy
                </button>
                <button className="p-1 ml-5 mr-5 bg-yellow-200 bg-opacity-50 rounded hover:bg-yellow-300">
                  medium
                </button>
                <button className="p-1 bg-red-200 bg-opacity-50 rounded hover:bg-red-300">
                  hard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderOrModalLayout>
  );
};
