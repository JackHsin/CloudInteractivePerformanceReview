import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigator from "../navigation/navigation";
import Footer from "../footer/footer";
import { accessToken } from "../../store/login";
import { getAndSetAccountInfo } from "../../graphql/apollo-client";
import { updateUserInfo } from "../../store/user";

const Layout = ({ children }: any) => {
  const token = useSelector(accessToken);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      const data = getAndSetAccountInfo();
    }
  }, [token]);
  return (
    <div>
      <Navigator></Navigator>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default Layout;
