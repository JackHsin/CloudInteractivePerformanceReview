import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

import { gql } from "@apollo/client";
import client, { getAndSetAccountInfo } from "../graphql/apollo-client";
import { useDispatch, useSelector } from "react-redux";
import { accessToken, clearTokens } from "../store/login";
import { clearUserInfo, getAccountInfoByAccessToken } from "../store/user";
import { RootState } from "../store";

const Home: NextPage = () => {
  const dispatch = useDispatch();

  const token = useSelector(accessToken);

  const state = useSelector((state: RootState) => state);

  useEffect(() => {
    console.log("\x1b[32m", "\n--------------Debug----------------\n");
    console.log("\x1b[36m", `token = `, token);
    console.log("\x1b[32m", "\n-----------------------------------", "\x1b[0m");

    if (token) {
      getAndSetAccountInfo();
    }
  }, [token]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Performance</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome {state.user.info.username} to Performance Review Panel
        </h1>
        <button
          onClick={() => {
            dispatch(clearTokens());
            // dispatch(clearUserInfo());
          }}
        >
          Logout
        </button>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
