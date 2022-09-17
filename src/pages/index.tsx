import type { NextPage } from "next";
import Head from "next/head";
import Nav from "../components/Nav";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>InstakiloGram</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main>
        <h1 className="h-[200vh] bg-blue-400">Kilo</h1>
      </main>
    </>
  );
};

export default Home;
