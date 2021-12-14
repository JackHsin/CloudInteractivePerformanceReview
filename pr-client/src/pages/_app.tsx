import { AppProps } from "next/app";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import store from "../store";
import WithErrorHandler from "../components/withErrorHandler/withErrorHandler";

import "../styles/globals.css";

const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Component {...pageProps} />} persistor={persistor}>
        <Component {...pageProps} />
        <WithErrorHandler />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
