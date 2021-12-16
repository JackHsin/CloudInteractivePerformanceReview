import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navigator from "../navigation/navigation";
import Footer from "../footer/footer";
import { accessToken } from "../../store/login";
import { getAndSetAccountInfo } from "../../graphql/apollo-client";

const Layout = ({ children }: any) => {
  const token = useSelector(accessToken);
  useEffect(() => {
    if (token) {
      getAndSetAccountInfo();
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
