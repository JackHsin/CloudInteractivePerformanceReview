import * as LOGIN_TYPE from "../../constants/login";

const REDIRECT_URL = process.env.NEXT_PUBLIC_AOM_AUTH_REDIRECT_URL;

export default {
  apple: {
    url: "https://appleid.apple.com/auth/authorize",
    params: {
      client_id: "services.com.cyr.aom",
      response_type: "code",
      redirect_uri: REDIRECT_URL,
      state: LOGIN_TYPE.APPLE,
    },
  },
  facebook: {
    url: "https://www.facebook.com/v10.0/dialog/oauth",
    params: {
      client_id: "444922106902455",
      response_type: "code",
      redirect_uri: REDIRECT_URL,
      scope: "email",
      state: LOGIN_TYPE.FACEBOOK,
    },
  },
  google: {
    url: "https://accounts.google.com/o/oauth2/v2/auth",
    params: {
      client_id:
        "977177252015-ao62pgoo9ck02bd4a5nkbqhp6gsre68d.apps.googleusercontent.com",
      response_type: "code",
      redirect_uri: REDIRECT_URL,
      scope:
        "https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email",
      state: LOGIN_TYPE.GOOGLE,
    },
  },
  line: {
    url: "https://access.line.me/oauth2/v2.1/authorize",
    params: {
      client_id: "1655591148",
      response_type: "code",
      redirect_uri: REDIRECT_URL,
      scope: "profile%20openid%20email",
      state: LOGIN_TYPE.LINE,
    },
  },
};
