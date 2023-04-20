import React from "react";
import { SpeedTable } from "@/models/table/table";
import { useState, useEffect } from "react";
import _ from "lodash";
import { Card } from "@/models/card/card";
import { BasicButton } from "@/components/common/ui/atoms/buttons/BasicButton";
import Image from "next/image";
import { v4 } from "uuid";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useCustomMediaQuery } from "@/hooks/common/useCustomMediaQuery";

function useWidthAndHeight() {
  const { isMoreThanSm, isMoreThanMd, isMoreThanLg, isMoreThanXl } =
    useCustomMediaQuery();

  let width = 50;
  if (isMoreThanMd) width = 100;
  let height = width * 1.5;
  return { width, height };
}

type CardComponentProps = {
  card: Card;
  onClick: () => void;
};

const CardComponent: React.FC<CardComponentProps> = (props) => {
  const { card, onClick } = props;

  const { isMoreThanSm, isMoreThanMd, isMoreThanLg, isMoreThanXl } =
    useCustomMediaQuery();
  let width = 50;
  if (isMoreThanMd) width = 100;
  let height = width * 1.5;

  return (
    <Image
      src={card.imgUrl}
      alt="picture"
      width={width}
      height={height}
      onClick={onClick}
      className="m-5 py-3"
    />
  );
};

type CardsFieldProps = { cards: Card[]; handleClickCard };
const CardsField: React.FC<CardsFieldProps> = (props) => {
  const { cards, handleClickCard } = props;
  const hiddenImgUrl: string = "/cards/BACK.png";
  const toRenderCards = [];
  for (let index = 0; index < 4; index++) {
    if (cards && cards.length - 1 >= index) toRenderCards.push(cards[index]);
  }

  const { width, height } = useWidthAndHeight();

  return (
    <>
      {toRenderCards.map((card) => {
        if (!card) return;
        const key: string = v4().toString();
        return (
          <CardComponent
            card={card}
            onClick={() => handleClickCard(card)}
            key={key}
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
  const { width, height } = useWidthAndHeight();

  return (
    <>
      {cardsInStrages.map((card: Card, index: number) => {
        const key: string = v4().toString();
        return (
          <CardComponent
            card={card}
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (speedTable.gamePhase == "firstRound") hancleClickGameStartBtn();
    const houseActionInterval = setInterval(() => {
      executeHouseAction();
    }, 3000);

    const modalInterval = setInterval(() => {
      if (
        (speedTable.user.hand.length <= 0 ||
          speedTable.house.hand.length <= 0) &&
        speedTable.gamePhase == "roundOver"
      )
        setIsModalOpen(true);
    }, 500);
    return () => {
      clearInterval(houseActionInterval);
      clearInterval(modalInterval);
    };
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <>
      <div className="flex  justify-center">
        <div className="flex grid grid-rows-4 gap-4">
          <Modal
            isOpen={isModalOpen}
            contentLabel="again btn modal"
            style={customStyles}
          >
            <button
              onClick={() => {
                setIsModalOpen(false);
                hancleClickGameStartBtn();
              }}
            >
              next game
            </button>
          </Modal>

          {(speedTable.gamePhase == "acting" ||
            speedTable.gamePhase == "roundOver") && (
            <div className="">
              {}

              <div className="flex justify-center">
                <CardsField
                  cards={speedTable.house.hand}
                  handleClickCard={handleClickCard}
                />
              </div>

              <div className="flex justify-center">
                <StrageField
                  cardsInStrages={cardsInStrages}
                  handleClickCardInStrages={handleClickCardInStrages}
                />
              </div>

              <div className="flex justify-center">
                <CardsField
                  cards={speedTable.user.hand}
                  handleClickCard={handleClickCard}
                />
              </div>
            </div>
          )}

          {speedTable.gamePhase == "acting" && (
            <div className="flex justify-center h-10">
              <BasicButton
                buttonType="yellow"
                onClick={hancleClickGameReStartBtn}
                mediaQueries=""
              >
                restart
              </BasicButton>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
