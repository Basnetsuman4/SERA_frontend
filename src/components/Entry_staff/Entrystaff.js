import React from "react";
import Dashboard from "../Dashboard";
import Sidenav from "../Sidenav";

const Entrystaff = (props) => {
  return (
    <>
      <Sidenav />
      <Dashboard comp={props.component} />
    </>
  );
};

export default Entrystaff;
