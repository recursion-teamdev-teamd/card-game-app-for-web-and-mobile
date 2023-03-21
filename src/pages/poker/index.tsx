import { PokerPage } from '@/components/page/PokerPage'
import Head from 'next/head'

export default function Poker() {
  return (
    <>
      <Head>
        <title>Poker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <PokerPage/>
      </div>
    </>
  )
}
