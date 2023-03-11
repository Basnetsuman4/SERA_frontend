import { Route, Routes } from "react-router-dom";
import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import { SecureComponent } from "./components/secureComponent";
import { useAuth } from "./Authentication/auth";

import Logout from "./components/Logout";
import ForgotPswd from "./components/ForgotPassword";
import Unauthorized from "./components/Unauthorized";

function App() {
  //------------------
  // const setAuthenticated = useAuth((state) => state.setAuthenticated);
  // const setRole = useAuth((state) => state.setRole);
  // setAuthenticated(true);
  // sessionStorage.setItem("role", 4);
  // // setRole(1);
  // // setRole(2);
  // // setRole(3);
  // setRole(4);
  //------------------
  const setToken = useAuth((state) => state.setToken);
  const setUser = useAuth((state) => state.setUser);
  const setRole = useAuth((state) => state.setRole);
  const setAuthenticated = useAuth((state) => state.setAuthenticated);
  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");
  const role = sessionStorage.getItem("role");

  setToken(token);
  setUser(user);
  setRole(role);
  const accesstoken = useAuth((state) => state.accesstoken);
  {
    accesstoken != null && setAuthenticated(true);
  }
  const isauthenticated = useAuth((state) => state.isauthenticated);
  // console.log(isauthenticated);

  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/forgotpassword" element={<ForgotPswd />} />
        <Route path="*" element={<Unauthorized />} />

        {isauthenticated && (
          <Route path="/secure/*" element={<SecureComponent />} />
        )}
      </Routes>
    </>
  );
}

export default App;
