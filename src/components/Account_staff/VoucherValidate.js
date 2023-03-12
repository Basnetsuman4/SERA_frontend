import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../apis";
import "../../css/Voucher.css";

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
          <div className="forColumnFormat">
          <div className="voucher-card-title">
            <div className="titleNaming">
              <span>Username</span>
              <span>Semester</span>
              <span>Amount</span>
              {/* <span>Voucher ID</span> */}
              <span>Voucher</span>
            </div>
          </div>
            {data.map((singleoption, key) => (
              <div className="titleNaming">
                <span>{singleoption.userName}</span>
                <span>{singleoption.semester}</span>
                <span> Rs. {singleoption.amount}</span>

                <button
                  id="btnFVD"
                  onClick={() =>
                    navigate("/secure/voucherimg", {
                      state: { detail: singleoption },
                    })
                  }
                >
                  View
                </button>
              </div>
            ))}
          {/* </div> */}
        </div>
        </div>
  )
}
    </>
  );
}
