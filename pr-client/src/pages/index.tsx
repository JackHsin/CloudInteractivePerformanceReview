import type { NextPage } from "next";
import Head from "next/head";
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
          <h1 className={styles.title}>Performance Review Dashboard</h1>
          <h1 className={styles.title} style={{ color: "pink" }}>
            Welcome {state.user.info.username}
          </h1>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
