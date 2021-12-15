import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import { findAllReviews, getAndSetAccountInfo } from "../graphql/apollo-client";
import { useDispatch, useSelector } from "react-redux";
import { accessToken, clearTokens } from "../store/login";
import { clearUserInfo } from "../store/user";
import { RootState } from "../store";
import Layout from "../components/layout/layout";

const Admin: NextPage = () => {
  const reviewContents = [];

  const dispatch = useDispatch();

  const token = useSelector(accessToken);

  const state = useSelector((state: RootState) => state);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const findAllReviewsAsync = async () => {
      const data = await findAllReviews();
      setReviews(data);
    };
    findAllReviewsAsync();
  }, []);

  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    reviewContents.push(
      <div>
        <h5>{review.name}</h5>
        <p>{review.description}</p>
        <time>{review.expiredAt}</time>
      </div>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Admin</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome {state.user.info.username} to Admin
          </h1>

          <div>{reviewContents}</div>

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

export default Admin;
