import useUser from "../hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import LoadingPage from "../components/pages/Loading";

const AuthMiddlewareComponent = ({ Component, props }) => {
  const { user, loading } = useUser();
  const navigation = useNavigation();

  if (loading || !user) {
    if (!user) {
      navigation.navigate("Home");
    }
    return <LoadingPage />;
  }

  return <Component {...{ ...props, user }} />;
};

export default function withAuth(Component) {
  return function (props) {
    return <AuthMiddlewareComponent Component={Component} props={props} />;
  };
}
