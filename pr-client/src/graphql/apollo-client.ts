import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import store from "../store";
import { updateUserInfo } from "../store/user";

const data = store.getState();

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_GATEWAY_BASE_PATH}/graphql`,
  headers: {
    Authorization: `Bearer ${data.login.accessToken}`,
    // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
  cache: new InMemoryCache(),
});

// export default client;

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
  console.log("\x1b[32m", "\n--------------Debug----------------\n");
  console.log("\x1b[36m", `data = `, data.findOne);
  console.log("\x1b[32m", "\n-----------------------------------", "\x1b[0m");
  store.dispatch(updateUserInfo(data.findOne));
};
