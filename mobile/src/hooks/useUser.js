import { useContext } from "react";
import { UserContext } from "../context/user.context";

export default function useUser() {
  return useContext(UserContext);
}
