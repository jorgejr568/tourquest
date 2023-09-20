import useUser from "../hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import LoadingPage from "../components/pages/Loading";
import { forwardRef } from "react";

const AuthMiddlewareComponent = forwardRef(({ Component, props }, ref) => {
  const { user, loading } = useUser();
  const navigation = useNavigation();

  if (loading || !user) {
    if (!user) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
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
