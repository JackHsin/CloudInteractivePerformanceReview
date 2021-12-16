import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/router";
import Layout from "../components/layout/layout";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const state = useSelector((state: RootState) => state);

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
      </div>
    </Layout>
  );
};

export default Home;
