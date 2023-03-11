import React from "react";
import Dashboard from "../Dashboard";
import Sidenav from "../Sidenav";

const Accountstaff = (props) => {
  return (
    <>
      <Sidenav />
      <Dashboard comp={props.component} />
    </>
  );
};

export default Accountstaff;
