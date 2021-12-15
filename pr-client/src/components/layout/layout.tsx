import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import classes from "./layout.module.scss";
import { RootState } from "../../store";
import { clearTokens } from "../../store/login";
import { clearUserInfo } from "../../store/user";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className={classes.layout}>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          dispatch(clearTokens());
          dispatch(clearUserInfo());
        }}
      >
        Logout
      </button>
      {children}
    </div>
  );
};

export default Layout;
