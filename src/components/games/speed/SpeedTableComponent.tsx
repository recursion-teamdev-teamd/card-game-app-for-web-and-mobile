import React from "react";
import { useState, useEffect } from "react";
import _ from "lodash";
import { Card } from "@/models/card/card";
import { BasicButton } from "@/components/common/ui/atoms/buttons/BasicButton";
import Image from "next/image";
import { v4 } from "uuid";

type CardsFieldProps = { cards: Card[]; handleClickCard };

const CardsField: React.FC<CardsFieldProps> = (props) => {
  const { cards, handleClickCard } = props;
  const hiddenImgUrl: string = "/cards/BACK.png";
  const toRenderCards = [];
  for (let index = 0; index < 4; index++) {
    if (cards && cards.length - 1 >= index) toRenderCards.push(cards[index]);
  }

  return (
    <>
      {toRenderCards.map((card) => {
        if (!card) return;
        const key: string = v4().toString();
        return card.isOpen ? (
          <Image
            src={card.imgUrl}
            alt="picture"
            width={200}
            height={100}
            key={key}
            onClick={() => handleClickCard(card)}
          />
        ) : (
          <Image
            src={hiddenImgUrl}
            alt="picture"
            width={200}
            height={100}
            key={key}
            onClick={() => handleClickCard(card)}
          />
        );
      })}
    </>
  );
};

type StrageFieldProps = {
  cardsInStrages;
  handleClickCardInStrages;
};

const StrageField: React.FC<StrageFieldProps> = (props) => {
  const { cardsInStrages, handleClickCardInStrages } = props;
  const hiddenImgUrl: string = "/cards/BACK.png";

  return (
    <>
      {cardsInStrages.map((card: Card, index: number) => {
        const key: string = v4().toString();
        return card.isOpen ? (
          <Image
            src={card.imgUrl}
            alt="picture"
            width={200}
            height={100}
            key={key}
            onClick={() => handleClickCardInStrages(index, card)}
          />
        ) : (
          <Image
            src={hiddenImgUrl}
            alt="picture"
            width={200}
            height={100}
            key={key}
            onClick={() => handleClickCardInStrages(index, card)}
          />
        );
      })}
    </>
  );
};
type SpeedTableComponentProps = {
  speedTable;
  handleClickCard;
  cardsInStrages;
  handleClickCardInStrages;
  hancleClickGameStartBtn;
  hancleClickGameReStartBtn;
  executeHouseAction;
};

export const SpeedTableComponent: React.FC<SpeedTableComponentProps> = (
  props
) => {
  const {
    speedTable,
    handleClickCard,
    cardsInStrages,
    handleClickCardInStrages,
    hancleClickGameStartBtn,
    hancleClickGameReStartBtn,
    executeHouseAction,
  } = props;

  useEffect(() => {
    const interval = setInterval(() => {
      executeHouseAction();
    }, 3000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <div>{speedTable.gamePhase}</div>
      <div className="flex  justify-center">
        <div className="grid grid-rows-3 grid-flow-col gap-4">
          {speedTable.gamePhase == "firstRound" && (
            <BasicButton
              buttonType="yellow"
              onClick={hancleClickGameStartBtn}
              mediaQueries="flex justify-center"
            >
              gamestart
            </BasicButton>
          )}
          {(speedTable.gamePhase == "acting" ||
            speedTable.gamePhase == "roundOver") && (
            <div>
              <div className="flex justify-center">
                <div>house</div>
                <CardsField
                  cards={speedTable.house.hand}
                  handleClickCard={handleClickCard}
                />
              </div>

              <div className="flex justify-center">
                <div>strage</div>
                {speedTable.house.hand.length > 0 ? (
                  <StrageField
                    cardsInStrages={cardsInStrages}
                    handleClickCardInStrages={handleClickCardInStrages}
                  />
                ) : (
                  <div>
                    <div> you lose</div>
                    <BasicButton
                      buttonType="yellow"
                      onClick={hancleClickGameStartBtn}
                      mediaQueries="flex justify-center"
                    >
                      try again
                    </BasicButton>
                  </div>
                )}
              </div>

              <div className="flex  justify-center">
                <div>user</div>
                {speedTable.user.hand.length > 0 ? (
                  <div className="flex justify-center">
                    <CardsField
                      cards={speedTable.user.hand}
                      handleClickCard={handleClickCard}
                    />
                    <div>click to restart</div>
                    <Image
                      src={"/cards/BACK.png"}
                      alt="picture"
                      width={200}
                      height={100}
                      key={0}
                      onClick={hancleClickGameReStartBtn}
                    />
                  </div>
                ) : (
                  <div>
                    <div>you win</div>
                    <BasicButton
                      buttonType="yellow"
                      onClick={hancleClickGameStartBtn}
                      mediaQueries="flex justify-center"
                    >
                      again
                    </BasicButton>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
