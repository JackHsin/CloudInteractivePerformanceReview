import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import store from "../store";
import { updateUserInfo } from "../store/user";

// TODO: Make it singleton or hooks, so it will be recreated only when token changed
const createClient = () => {
  const data = store.getState();
  return new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_GATEWAY_BASE_PATH}/graphql`,
    headers: {
      Authorization: `Bearer ${data.login.accessToken}`,
      // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    cache: new InMemoryCache({ resultCaching: false }),
  });
};

export const getAndSetAccountInfo = async () => {
  const client = createClient();
  const { data } = await client.query({
    query: gql`
      {
        findOne {
          id
          username
          role
        }
      }
    `,
  });

  store.dispatch(updateUserInfo(data.findOne));
};

export const findAllReviews = async () => {
  const client = createClient();
  const { data } = await client.query({
    query: gql`
      {
        findAllReviews {
          id
          name
          description
          subjectAccountId
          status
          expiredAt
          feedbacks {
            reviewerAccountId
          }
        }
      }
    `,
  });
  console.log("\x1b[32m", "\n--------------Debug----------------\n");
  console.log("\x1b[36m", `data = `, data.findAllReviews);
  console.log("\x1b[32m", "\n-----------------------------------", "\x1b[0m");
  return data.findAllReviews;
};

export const findAllNeedToFeedbackReviews = async () => {
  const client = createClient();
  const { data } = await client.query({
    query: gql`
      {
        findAllNeedToFeedbackReviews {
          id
          name
          description
          status
        }
      }
    `,
  });
  console.log("\x1b[32m", "\n--------------Debug----------------\n");
  console.log("\x1b[36m", `data = `, data.findAllNeedToFeedbackReviews);
  console.log("\x1b[32m", "\n-----------------------------------", "\x1b[0m");
  return data.findAllNeedToFeedbackReviews;
};
