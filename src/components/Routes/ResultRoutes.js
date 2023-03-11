import { Route, Routes } from "react-router-dom";
import EditResult from "../Entry_staff/EditResult";
import ResultForm from "../Entry_staff/ResultForm";
import SearchStudent from "../Entry_staff/SearchStudent";
import { Selection } from "../Entry_staff/Selection";
import ViewResult from "../Entry_staff/ViewResult";
import NoMatch from "../NoMatch";

function ResultRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<SearchStudent />} />
        <Route path="selection" element={<Selection />} />
        <Route path="marksentry" element={<ResultForm />} />
        <Route path="viewresult" element={<ViewResult />} />
        <Route path="editresult" element={<EditResult />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
export default ResultRoutes;
