import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import {
  createAccount,
  findAllAccounts,
  removeAccount,
} from "../graphql/apollo-client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Layout from "../components/layout/layout";
import { AnyObject } from "immer/dist/internal";

const Admin: NextPage = () => {
  const state = useSelector((state: RootState) => state);

  const [accounts, setAccounts] = useState<AnyObject[]>([]);

  const [newAccountUsername, setNewAccountUsername] = useState("");
  const [newAccountPassword, setNewAccountPassword] = useState("");

  const [reloadAccount, setReloadAccount] = useState(false);

  const findAllAccountsAsync = async () => {
    const data = await findAllAccounts();
    setAccounts(data);
  };

  useEffect(() => {
    findAllAccountsAsync();
  }, []);

  const accountList = () => {
    return (
      <div className={styles.grid}>
        {" "}
        {accounts.map((account) => {
          return (
            <div
              className={[styles.card, styles.cardAccount].join(" ")}
              key={account.id}
            >
              <p>Id: {account.id}</p>
              <p>Name: {account.username}</p>
              <p>Role: {account.role}</p>
              <button
                onClick={async () => {
                  await removeAccount(account.id);
                  setAccounts((old) => [
                    ...old.filter((oldAccount) => oldAccount.id !== account.id),
                  ]);
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const addAccount = async () => {
    if (!newAccountUsername || !newAccountPassword) {
      return;
    }
    const newAccount = await createAccount(
      newAccountUsername,
      newAccountPassword
    );
    setAccounts((old) => [...old, newAccount]);
    setNewAccountUsername("");
    setNewAccountPassword("");
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

          <h1>Accounts</h1>
          {accountList()}

          <h1>Add Account</h1>
          <div className={styles.grid}>
            <div className={styles.card}>
              <p>Name:</p>
              <input
                onChange={(e) => setNewAccountUsername(e.target.value)}
                value={newAccountUsername}
              ></input>
              <p>Password:</p>
              <input
                onChange={(e) => setNewAccountPassword(e.target.value)}
                value={newAccountPassword}
              ></input>
              <button onClick={addAccount}>Add</button>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Admin;
