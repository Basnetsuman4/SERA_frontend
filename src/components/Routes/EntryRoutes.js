import { Route, Routes } from "react-router-dom";
import Entrystaff from "../Entry_staff/Entrystaff";
import Profile from "../Profile";

import ChangePassword from "../ChangePassword";
import NoMatch from "../NoMatch";

import ResultRoutes from "./ResultRoutes";
import { BulkEntry } from "../Entry_staff/BulkEntry";
import { Confirmation } from "../Confirmation";

function EntryRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} />
        <Route path="changepassword" element={<ChangePassword />} />
        <Route path="searchstudent/*" element={<ResultRoutes />} />
        <Route path="bulkentry/" element={<BulkEntry />} />
        <Route path="confirmation" element={<Confirmation />} />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
export default EntryRoutes;
