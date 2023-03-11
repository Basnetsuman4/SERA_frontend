import { useNavigate } from "react-router-dom";

import React from "react";
import "../css/Unauthorized.css";

export default function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <>
      <div className="body">
        <div className="FPbody">
          <div className="FPBox">
            <div className="formBox">
              <div className="deniedimg">
                <img
                  src="https://img.freepik.com/premium-vector/access-denied-alert-vector-illustration-design_624938-543.jpg?w=2000"
                  alt="access denied"
                />
                <p>You do not have permission to access this page.</p>
              </div>
              <div className="inputBx">
                <button onClick={goBack}>Go Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
