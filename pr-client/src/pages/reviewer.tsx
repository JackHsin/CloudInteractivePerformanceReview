import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import {
  findAllNeedToFeedbackReviews,
  findAllReviews,
  getAndSetAccountInfo,
} from "../graphql/apollo-client";
import { useDispatch, useSelector } from "react-redux";
import { accessToken, clearTokens } from "../store/login";
import { clearUserInfo } from "../store/user";
import { RootState } from "../store";
import Layout from "../components/layout/layout";
import FeedbackCard from "../components/feedbackCard/feedbackCard";

const Reviwer: NextPage = () => {
  const reviewContents = [];

  const dispatch = useDispatch();

  const token = useSelector(accessToken);

  const state = useSelector((state: RootState) => state);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const findAllNeedToFeedbackReviewsAsync = async () => {
      const data = await findAllNeedToFeedbackReviews();
      setReviews(data);
    };
    findAllNeedToFeedbackReviewsAsync();
  }, []);

  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    console.log("\x1b[32m", "\n--------------Debug----------------\n");
    console.log("\x1b[36m", `review = `, review);
    console.log("\x1b[32m", "\n-----------------------------------", "\x1b[0m");
    reviewContents.push(
      <FeedbackCard reviewerId={state.user.info.id} review={review} />
      // <div>
      //   <h5>{review.name}</h5>
      //   <p>{review.description}</p>
      // </div>

      // <div className={styles.grid}>
      //   <div className={styles.card}>
      //     <h2>Name: {review.name}</h2>
      //     <p>Description {review.description}</p>
      //     <div>
      //       <textarea></textarea>
      //     </div>
      //     <button onClick={}>Submit</button>
      //   </div>
      // </div>
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
          <h1 className={styles.title}>Welcome {state.user.info.username}</h1>

          {reviewContents}
        </main>
      </div>
    </Layout>
  );
};

export default Reviwer;
