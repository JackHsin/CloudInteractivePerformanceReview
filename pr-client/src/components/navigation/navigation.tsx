import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { clearTokens } from "../../store/login";
import { clearUserInfo } from "../../store/user";

const Navigator = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div>
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
    </div>
  );
};

export default Navigator;
