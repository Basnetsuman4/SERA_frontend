import { Route, Routes } from "react-router-dom";
import Profile from "../Profile";
import PaymentRoutes from "./PaymentRoutes";
import ChangePassword from "../ChangePassword";
import NoMatch from "../NoMatch";
import Graph from "../Student/Graph";
import { Selection } from "../Student/Selection";
import { ViewResult } from "../Student/ViewResult";
import { Confirmation } from "../Confirmation";

function StudentRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} />
        <Route path="payment/*" element={<PaymentRoutes />} />
        <Route path="changepassword" element={<ChangePassword />} />
        <Route path="selection" element={<Selection />} />
        <Route path="viewresult" element={<ViewResult />} />
        <Route path="progressgraph" element={<Graph />} />
        <Route path="confirmation" element={<Confirmation />} />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
export default StudentRoutes;
