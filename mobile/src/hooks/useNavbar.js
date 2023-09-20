import { useContext } from "react";
import { NavbarContext } from "../context/navbar.context";

export default function useNavbar() {
  return useContext(NavbarContext);
}
