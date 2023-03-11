import React, { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../../css/Register.css";

const Register = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="midBox">
          <div className="forStudent">
            <div className="cardfs">
              <div className="imgsec">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9j5kXSP12ylfgHx30qabxtDu0GAX1cm19TTaKZVA1hONj-t6MfsXechjGt6hyYoPBD4Y&usqp=CAU" />
              </div>

              <div className="btnsec">
                <button
                  id="btn"
                  onClick={() => {
                    navigate("registerstudent");
                  }}
                >
                  Register Student
                </button>
              </div>
            </div>
          </div>

          <div className="forStaff">
            <div className="cardfst">
              <div className="imgsec">
                <img src="https://img.freepik.com/premium-vector/elegant-man-business-suit-with-badge-man-business-avatar-profile-picture-vector-illustration-isolated_625536-1377.jpg" />
              </div>

              <div className="btnsec">
                <button
                  id="btn"
                  onClick={() => {
                    navigate("registerstaff");
                  }}
                >
                  Register Staff
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
