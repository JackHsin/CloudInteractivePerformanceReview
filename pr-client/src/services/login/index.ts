import config from "./config";

const composeParams = (params) =>
  Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&");

const withSignIn = (state) => () => {
  const paramsString = composeParams(state.params);
  const link = `${state.url}?${paramsString}`;
  window.location.href = link;
};

export const appleSignIn = withSignIn(config.apple);
export const facebookSignIn = withSignIn(config.facebook);
export const googleSignIn = withSignIn(config.google);
export const lineSignIn = withSignIn(config.line);
