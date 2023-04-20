import { RummyPage } from "@/components/page/RummyPage";
import Head from "next/head";

export default function Rummy() {
  return (
    <>
      <Head>
        <title>Rummy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <RummyPage />
      </div>
    </>
  );
}
