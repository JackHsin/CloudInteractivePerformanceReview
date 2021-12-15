import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

import { getAndSetAccountInfo } from "../graphql/apollo-client";
import { useDispatch, useSelector } from "react-redux";
import { accessToken, clearTokens } from "../store/login";
import { clearUserInfo } from "../store/user";
import { RootState } from "../store";
import { useRouter } from "next/router";
import Layout from "../components/layout/layout";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const token = useSelector(accessToken);

  const state = useSelector((state: RootState) => state);

  useEffect(() => {
    if (token) {
      getAndSetAccountInfo();
    }
  }, [token]);

  return (
    <Layout>
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
              if (state.user.info.role === "ADMIN") {
                router.push("/admin");
              } else {
                router.push("/reviewer");
              }
            }}
          >
            Go
          </button>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </Layout>
  );
};

export default Home;
