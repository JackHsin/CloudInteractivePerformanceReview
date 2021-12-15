import router from "next/router";
import { stringify } from "querystring";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import { loginAndSaveToken } from "../store/login";

const Login = () => {
  const dispatch = useDispatch();

  const [username, userInput] = useInput({ type: "text" });
  const [password, passwordInput] = useInput({ type: "text" });

  const submit = async () => {
    if (username && password) {
      dispatch(
        loginAndSaveToken({ username, password } as {
          username: string;
          password: string;
        })
      );
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>{userInput}</div>
      <div>{passwordInput}</div>
      <button onClick={submit}>Login</button>
    </div>
  );
};
export default Login;
