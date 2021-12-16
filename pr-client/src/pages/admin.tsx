import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  createReview,
  findAllAccounts,
  findAllReviews,
} from "../graphql/apollo-client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Layout from "../components/layout/layout";
import { AnyObject } from "immer/dist/internal";
import { useRouter } from "next/router";

const Admin: NextPage = () => {
  const reviewContents = [];
  const router = useRouter();

  const state = useSelector((state: RootState) => state);

  const [reviews, setReviews] = useState<AnyObject[]>([]);
  const [accounts, setAccounts] = useState<AnyObject[]>([]);

  const [reviewee, setReviewee] = useState<{ id: number; username: string }>({
    id: 0,
    username: "",
  });
  const [reviewers, setReviewers] = useState<number[]>([]);

  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewDes, setNewReviewDes] = useState("");

  useEffect(() => {
    const findAllReviewsAsync = async () => {
      const data = await findAllReviews();
      setReviews(data);
    };
    findAllReviewsAsync();
  }, []);

  useEffect(() => {
    const findAllAccountsAsync = async () => {
      const data = await findAllAccounts();
      setAccounts(data);

      setReviewee({ id: data[0].id, username: data[0].username });
    };

    findAllAccountsAsync();
  }, []);

  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    reviewContents.push(
      <div className={styles.card} key={review.id}>
        <h2>Name: {review.name}</h2>
        <p>Description: {review.description}</p>
      </div>
    );
  }

  const revieweeSelector = () => {
    const options = [];
    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i];
      if (account.username !== "admin")
        options.push(
          <option key={account.id} value={account.id}>
            {account.username}
          </option>
        );
    }

    return (
      <div>
        <select
          onChange={(e) => {
            const index = e.target.selectedIndex;
            const accountId = e.target.value;
            const accountName = e.target.options[index].text;
            setReviewee({
              id: Number(accountId),
              username: accountName,
            });
          }}
        >
          {options}
        </select>
      </div>
    );
  };

  const updateReviewerArray = (e: any) => {
    const checked = e.target.checked;
    const accountId = e.target.value;

    if (checked) {
      setReviewers((old) => [...old, Number(e.target.value)]);
    } else {
      const newReviewers = reviewers.filter(
        (reviewer) => reviewer !== accountId
      );
      setReviewers(newReviewers);
    }
  };

  const reviewerCheckboxes = () => {
    const checkboxes = [];
    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i];
      if (account.username !== "admin")
        checkboxes.push(
          <label key={account.id}>
            <input
              type="checkbox"
              value={account.id}
              onChange={updateReviewerArray}
            ></input>
            {account.username}
          </label>
        );
    }

    return <div>{checkboxes}</div>;
  };

  const addReview = async () => {
    if (!reviewee || !reviewee.username || !reviewee.id) {
      return;
    }
    const data = await createReview(
      reviewee.username,
      reviewee.id,
      newReviewName,
      newReviewDes,
      reviewers
    );

    console.log("\x1b[32m", "\n--------------Debug----------------\n");
    console.log("\x1b[36m", `data = `, data);
    console.log("\x1b[32m", "\n-----------------------------------", "\x1b[0m");

    setReviews((old) => [
      ...old,
      { id: data.id, name: data.name, description: data.description },
    ]);
  };

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

          <h1>Reviews</h1>
          <div className={styles.grid}>
            {reviews.map((review) => (
              <div className={styles.card} key={review.id}>
                <h2>Name: {review.name}</h2>
                <p>Description: {review.description}</p>
              </div>
            ))}
          </div>

          <h1>Add Review</h1>
          <div className={styles.grid}>
            <div className={styles.card}>
              <p>Reviewee</p>
              {revieweeSelector()}
              <p>Name:</p>
              <input onChange={(e) => setNewReviewName(e.target.value)}></input>
              <p>Description:</p>
              <input onChange={(e) => setNewReviewDes(e.target.value)}></input>
              <p>Reviewer</p>
              {reviewerCheckboxes()}
              <button onClick={addReview}>Submit</button>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Admin;
