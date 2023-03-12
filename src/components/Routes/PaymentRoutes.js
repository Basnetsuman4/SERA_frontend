import { Routes, Route } from "react-router-dom";
import NoMatch from "../NoMatch";
import Dues from "../Student/Dues";
import Payment from "../Student/Payment";
import Statement from "../Student/Statement";

function PaymentRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<Payment />} />
        <Route path="statement" element={<Statement />} />
        <Route path="dues" element={<Dues />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
export default PaymentRoutes;
