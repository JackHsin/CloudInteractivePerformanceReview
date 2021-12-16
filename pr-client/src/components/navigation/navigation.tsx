import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { clearTokens } from "../../store/login";
import { clearUserInfo } from "../../store/user";
import { client } from "../../graphql/apollo-client";
import { RootState } from "../../store";

const Navigator = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector((state: RootState) => state);

  return (
    <div>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        Home
      </button>
      {state.user.info.role === "ADMIN" && (
        <button
          onClick={() => {
            router.push("/account");
          }}
        >
          Account
        </button>
      )}

      <button
        onClick={() => {
          if (state.user.info.role === "ADMIN") router.push("/admin");
          else router.push("/reviewer");
        }}
      >
        Review
      </button>

      <button
        onClick={() => {
          dispatch(clearTokens());
          dispatch(clearUserInfo());
          client.resetStore();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navigator;
