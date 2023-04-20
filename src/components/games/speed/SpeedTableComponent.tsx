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
            width={100}
            height={150}
            key={key}
            onClick={() => handleClickCard(card)}
            className="m-5 py-3"
          />
        ) : (
          <Image
            src={hiddenImgUrl}
            alt="picture"
            width={100}
            height={10}
            key={key}
            onClick={() => handleClickCard(card)}
            className="m-5 py-3"
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
            width={100}
            height={150}
            key={key}
            onClick={() => handleClickCardInStrages(index, card)}
            className="mx-5"
          />
        ) : (
          <Image
            src={hiddenImgUrl}
            alt="picture"
            width={100}
            height={150}
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
        {speedTable.gamePhase == "firstRound" && (
          <BasicButton
            buttonType="yellow"
            onClick={hancleClickGameStartBtn}
            mediaQueries="flex justify-center "
          >
            gamestart
          </BasicButton>
        )}

        <div className="flex grid grid-rows-4  gap-4">
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
