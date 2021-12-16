import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import store from "../store";
import { updateUserInfo } from "../store/user";

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_GATEWAY_BASE_PATH}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const accessToken = store.getState().login.accessToken;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

// TODO: Need To Figure out Apollo Cache
// Issue: Refetching the data will get cached data when user updated the data
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const getAndSetAccountInfo = async () => {
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

  return data.findAllReviews;
};

export const findAllAccounts = async () => {
  const { data } = await client.query({
    query: gql`
      {
        findAll {
          id
          role
          username
        }
      }
    `,
  });
  return data.findAll;
};

export const findAllNeedToFeedbackReviews = async () => {
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
  return data.findAllNeedToFeedbackReviews;
};

export const submitFeedback = async (
  reviewerId: number,
  reviewId: number,
  feedback: string
) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation Submit($reviewerId: Int!, $reviewId: Int!, $feedback: String!) {
        submit(
          submitFeedbackInput: {
            reviewerAccountId: $reviewerId
            reviewId: $reviewId
            feedback: $feedback
          }
        ) {
          reviewId
          feedback
        }
      }
    `,
    variables: { reviewerId, reviewId, feedback },
  });
};

export const createReview = async (
  revieweeName: string,
  revieweeId: number,
  reviewName: string,
  description: string = "Please submit your feedback",
  reviewerAccountIds: number[]
) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation CreateReview(
        $revieweeId: Int!
        $reviewName: String!
        $description: String!
        $reviewerAccountIds: [Int!]!
      ) {
        createReview(
          createReviewInput: {
            subjectAccountId: $revieweeId
            name: $reviewName
            description: $description
            reviewerAccountIds: $reviewerAccountIds
          }
        ) {
          id
          name
          description
          status
        }
      }
    `,
    variables: {
      revieweeId,
      reviewName: `${revieweeName} ${reviewName}`,
      description,
      reviewerAccountIds,
    },
  });
};

export const createAccount = async (
  username: string,
  password: string,
  role = "EMPLOYEE"
) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation CreateReview(
        $username: String!
        $password: String!
        $role: String!
      ) {
        createAccount(
          createAccountInput: {
            username: $username
            password: $password
            role: $role
          }
        ) {
          id
          username
          role
        }
      }
    `,
    variables: {
      username,
      password,
      role,
    },
  });
  return data.createAccount;
};

export const removeAccount = async (accountId: number) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation removeAccount($accountId: Int!) {
        removeAccount(id: $accountId) {
          id
        }
      }
    `,
    variables: {
      accountId,
    },
  });
};
