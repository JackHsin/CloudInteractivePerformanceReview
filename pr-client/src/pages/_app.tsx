import { AppProps } from "next/app";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import store from "../store";
import RouteGuard from "../components/routeGuard/routeGurad";
import WithErrorHandler from "../components/withErrorHandler/withErrorHandler";

import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/apollo-client";

const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Component {...pageProps} />} persistor={persistor}>
        {/* <ApolloProvider client={client}> */}
        <Component {...pageProps} />
        {/* </ApolloProvider> */}
        <RouteGuard />
        <WithErrorHandler />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
