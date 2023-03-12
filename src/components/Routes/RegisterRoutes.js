import { Routes, Route } from "react-router-dom";
import Register from "../Admin/Register";
import RegisterStaff from "../Admin/RegisterStaff";
import RegisterStudent from "../Admin/RegisterStudent";
import NoMatch from "../NoMatch";

function RegisterRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<Register />} />
        <Route path="registerstudent" element={<RegisterStudent />} />
        <Route path="registerstaff" element={<RegisterStaff />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      {/* Registration vitra ko savai routes esma define garera pass gareko element ma  */}
    </>
  );
}
export default RegisterRoutes;
