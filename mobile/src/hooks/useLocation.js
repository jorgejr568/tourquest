import { useContext } from "react";
import { LocationContext } from "../context/location.context";

export default function useLocation() {
  return useContext(LocationContext);
}
