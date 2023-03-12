import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Errpage.css";

export default function NoMatch() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <>
      <div className="body">
        <div className="FPbody">
          <p>!!404!!</p>
          <br></br>
          <h1>Page Not Found</h1>
          <br></br>cd
          <button onClick={goBack}>Go Back</button>
        </div>
      </div>
    </>
  );
}
