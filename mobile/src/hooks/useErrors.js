import { useContext } from "react";
import { ErrorsContext } from "../context/errors.context";

export default function useErrors() {
  return useContext(ErrorsContext);
}
