import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const RouteGuard = () => {
  const router = useRouter();

  const accessToken = useSelector(
    (store: RootState) => store.login.accessToken
  );

  function authCheck(url: any) {
    // redirect to login page if accessing a private page and not logged in
    const noNeedAuthPaths = ["login"];
    const path: string = url.split("?")[0];

    if (noNeedAuthPaths.some((item) => !path.match(item))) {
      if (!accessToken) {
        router.push({
          pathname: "/login",
        });
      }
    } else {
      if (accessToken) {
        router.push({
          pathname: "/",
        });
      }
    }
  }

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // // on route change start - hide page content by setting authorized to false
    // const hideContent = () => setAuthorized(false);
    // router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      // router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [accessToken]);

  return <></>;
};

export default RouteGuard;
