import { ApolloClient, InMemoryCache } from "@apollo/client";
import store from "../store";

const data = store.getState();

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_GATEWAY_BASE_PATH}/graphql`,
  // uri: "https://countries.trevorblades.com",
  headers: {
    Authorization: `Bearer  ${data.login.tokens.accessToken}`,
  },
  cache: new InMemoryCache(),
});

export default client;
