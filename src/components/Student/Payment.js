import React from "react";
import { navigate, useNavigate } from "react-router-dom";

import "../../css/Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="midBox">
          <div className="forStatement">
            <div className="cardfStatement">
              <div className="imgsec">
                <img src="data:image/jpeg;base64,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" />
              </div>
              <div className="btnsec">
                <button
                  id="btn"
                  onClick={() => {
                    navigate("statement");
                  }}
                >
                  Statement
                </button>
              </div>
            </div>
          </div>

          <div className="forDueAmount">
            <div className="cardfDue">
              <div className="imgsec">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1v0YbtWcGRLTINT8LW4pG7yk4Go7BkD4E-w&usqp=CAU" />
              </div>
              <div className="btnsec">
                <button
                  id="btn"
                  onClick={() => {
                    navigate("dues");
                  }}
                >
                  Due Fee
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
