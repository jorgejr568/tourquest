import useUser from "../hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import LoadingPage from "../components/pages/Loading";

const GuestMiddlewareComponent = ({ Component, props }) => {
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

  return <Component {...props} />;
};

export default function withGuest(Component) {
  return function (props) {
    return <GuestMiddlewareComponent Component={Component} props={props} />;
  };
}
