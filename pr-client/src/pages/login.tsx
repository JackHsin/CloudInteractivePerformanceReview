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
      // const res = await axios.post("/auth/login", {
      //   username,
      //   password,
      // });

      // const accessToken = res.data.accessToken;
      // console.log("\x1b[32m", "\n--------------Debug----------------\n");
      // console.log("\x1b[36m", `token = `, res.data.accessToken);
      // console.log(
      //   "\x1b[32m",
      //   "\n-----------------------------------",
      //   "\x1b[0m"
      // );
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
