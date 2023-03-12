import { Route, Routes } from "react-router-dom";
import Cash from "../Account_staff/Cash";
import { ImageComponent } from "../Account_staff/ImageComponent";
import Scholarship from "../Account_staff/Scholarship";
import SearchStudent from "../Account_staff/SearchStudent";
import UpdateBill from "../Account_staff/UpdateBill";
import { VoucherValidate } from "../Account_staff/VoucherValidate";
import ChangePassword from "../ChangePassword";
import { Confirmation } from "../Confirmation";
import NoMatch from "../NoMatch";
import Profile from "../Profile";

function AccountRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} />
        <Route path="payment" element={<Cash />} />
        <Route path="voucher" element={<VoucherValidate />} />
        <Route path="voucherimg" element={<ImageComponent />} />
        <Route path="changepassword" element={<ChangePassword />} />
        <Route path="searchstudent" element={<SearchStudent />} />
        <Route path="searchstudent/updatebill" element={<UpdateBill />} />
        <Route
          path="searchstudent/updatescholarship"
          element={<Scholarship />}
        />
        <Route path="confirmation" element={<Confirmation />} />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
export default AccountRoutes;
