import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from "next/head";
import {RecoilRoot} from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>1337Code</title>
        <meta name="description" content="Web application that contains leetcode problems and video solutions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </RecoilRoot>
  )

}
