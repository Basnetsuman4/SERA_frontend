import { Route, Routes } from "react-router-dom";
import Profile from "../Profile";
import RegisterRoutes from "./RegisterRoutes";
import Update from "../Admin/Update";
import Display from "../Admin/Display";
import EditDetails from "../Admin/EditDetails";
import DeleteUser from "../Admin/DeleteUser";
import ChangePassword from "../ChangePassword";
import NoMatch from "../NoMatch";
import { Confirmation } from "../Confirmation";

function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} />
        <Route path="registration/*" element={<RegisterRoutes />} />
        <Route path="update" element={<Update />} />
        <Route path="search" element={<Display />} />
        <Route path="edit" element={<EditDetails />} />
        <Route path="delete" element={<DeleteUser />} />
        <Route path="changepassword" element={<ChangePassword />} />
        <Route path="confirmation" element={<Confirmation />} />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
export default AdminRoutes;
