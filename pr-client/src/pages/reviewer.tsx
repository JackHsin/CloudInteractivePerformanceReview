import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import { findAllNeedToFeedbackReviews } from "../graphql/apollo-client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Layout from "../components/layout/layout";
import FeedbackCard from "../components/feedbackCard/feedbackCard";

const Reviewer: NextPage = () => {
  const state = useSelector((state: RootState) => state);

  const [reviews, setReviews] = useState<any[]>([]);

  const findAllNeedToFeedbackReviewsAsync = async () => {
    const data = await findAllNeedToFeedbackReviews();

    setReviews(data);
  };

  useEffect(() => {
    findAllNeedToFeedbackReviewsAsync();
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Admin</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Welcome {state.user.info.username}</h1>

          <div className={styles.grid}>
            {reviews.map((review) => (
              <FeedbackCard
                reviewerId={state.user.info.id}
                review={review}
                setReviews={setReviews}
                key={review.id}
              />
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Reviewer;
