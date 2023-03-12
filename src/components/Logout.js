import { useLogout } from "../apis";
import { Route, Routes, useNavigate } from "react-router-dom";
import { BrowserRouter as Prompt } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Login";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const isloggedout = logout();
  useEffect(() => {
    if (!isloggedout) {
      console.log("not logged out");
      return;
    }
    navigate("/login", { replace: true });
  });
}
