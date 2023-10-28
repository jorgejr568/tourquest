import useUser from "../hooks/useUser";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import LoadingPage from "../components/pages/Loading";
import { forwardRef } from "react";

const AuthMiddlewareComponent = forwardRef(({ Component, props }, ref) => {
  const { user, loading } = useUser();
  const routes = useNavigationState((state) => state.routes);
  const navigation = useNavigation();
  const routesWithoutLastOne = routes.slice(0, routes.length - 1);

  if (loading || !user) {
    if (!user) {
      navigation.reset({
        index: 0,
        routes: [
          ...routesWithoutLastOne,
          { name: "Login", params: { redirect: true } },
        ],
      });
    }
    return <LoadingPage />;
  }

  return <Component {...{ ...props, user, ref }} />;
});

export default function withAuth(Component) {
  return function (props) {
    return <AuthMiddlewareComponent Component={Component} props={props} />;
  };
}
