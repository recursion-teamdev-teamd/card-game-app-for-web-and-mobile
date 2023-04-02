import Head from "next/head";
import { GambleGamePhase } from "@/models/gamePhase/gamePhase";
import React from "react";
import { useBlackJackState } from "@/hooks/useBlackJack";
import { BlackJackGamePage } from "@/components/blackjack/BlackJackGamePage";
import { BlackJackBetPage } from "@/components/blackjack/BlackJackBetPage";

export default function Blackjack() {
  const {
    blackJackTable,
    setBlackJackTable,
    handleClickStandBtn,
    handleClickHitBtn,
    handleClickBetChip,
    handleClickGameStartBtn,
    handleClickGameAgainBtn,
    render,
  } = useBlackJackState();

  const BlackJackBetPageProps = {
    blackJackTable,
    setBlackJackTable,
    handleClickBetChip,
    handleClickGameStartBtn,
    render,
  };
  const BlackJackGamePageProps = {
    blackJackTable,
    setBlackJackTable,
    handleClickHitBtn,
    handleClickStandBtn,
    handleClickGameAgainBtn,
  };

  return (
    <>
      <Head>
        <title>Blackjack</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen">
        <div>{blackJackTable.user.chips}</div>
        <div>{blackJackTable.user.bet}</div>
        <div>{blackJackTable.gamePhase}</div>
        {/* {blackJackTable.gamePhase == GambleGamePhase.betting && (
          <BlackJackBetPage {...BlackJackBetPageProps} />
        )} */}
        {/* {blackJackTable.gamePhase == GambleGamePhase.acting && (
          <BlackJackGamePage {...BlackJackGamePageProps} />
        )} */}
        {blackJackTable.gamePhase == GambleGamePhase.betting ? (
          <BlackJackBetPage {...BlackJackBetPageProps} />
        ) : (
          <BlackJackGamePage {...BlackJackGamePageProps} />
        )}
      </div>
    </>
  );
}
