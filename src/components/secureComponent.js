import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../Authentication/auth";

import Admin from "./Admin/Admin";
import Accountstaff from "./Account_staff/Account_staff";
import Entrystaff from "./Entry_staff/Entrystaff";
import Student from "./Student/Student";
import AdminRoutes from "./Routes/AdminRoutes";
import AccountRoutes from "./Routes/Account_staffRoutes";
import EntryRoutes from "./Routes/EntryRoutes";
import StudentRoutes from "./Routes/StudentRoutes";

export function SecureComponent() {
  // console.log("secure");
  const navigate = useNavigate();
  const isauthenticated = useAuth((state) => state.isauthenticated);
  const role = useAuth((state) => state.role);

  if (isauthenticated) {
    return (
      <>
        {role == 1 && <Admin component={<AdminRoutes />} />}
        {role == 2 && <Accountstaff component={<AccountRoutes />} />}
        {role == 3 && <Entrystaff component={<EntryRoutes />} />}
        {role == 4 && <Student component={<StudentRoutes />} />}
      </>
    );
  } else {
    // Redirect to Login
    navigate("/login");
  }
}
