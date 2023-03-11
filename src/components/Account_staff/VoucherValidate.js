import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../apis";

export function VoucherValidate() {
  const { tokenInstance } = useToken();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    tokenInstance
      .get("unverified/voucher")
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        setData(err);
      });
  }, []);

  return (
    <>
      {/* <div className="wholeBody"> */}
      <div className="title">
        <h1>Voucher Details</h1>
      </div>
      {data.length == 0 && <div>No vouchers to validate.</div>}
      {data.length !== 0 && (
        <div className="mainBody">
          <div className="leftDiv">
            <div className="card1">
              {data.map((singleoption, key) => (
                <div className="inBox">
                  <h4>UserName : {singleoption.userName}</h4>
                  <br></br>
                  <h4>Semester: {singleoption.semester}</h4>
                  <h4>Amount: {singleoption.amount}</h4>
                  <h4>VoucherID: {singleoption.voucher_id}</h4>

                  <button
                    onClick={() =>
                      navigate("/secure/voucherimg", {
                        state: { detail: singleoption },
                      })
                    }
                  >
                    View Voucher
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
