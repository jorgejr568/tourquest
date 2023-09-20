import useUser from "../hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import LoadingPage from "../components/pages/Loading";
import { forwardRef } from "react";

const GuestMiddlewareComponent = forwardRef(({ Component, props }, ref) => {
  const { user, loading } = useUser();
  const navigation = useNavigation();

  if (loading || user) {
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    }

    return <LoadingPage />;
  }

  return <Component {...props} ref={ref} />;
});

export default function withGuest(Component) {
  return function (props) {
    return <GuestMiddlewareComponent Component={Component} props={props} />;
  };
}
