import React from "react";

import { StudentSidenavcomp } from "./Student/Sidenavcomp";
import { AdminSidenavcomp } from "./Admin/Sidenavcomp";
import { EntrystaffSidenavcomp } from "./Entry_staff/Sidenavcomp";
import { AccountSidenavcomp } from "./Account_staff/Sidenavcomp";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function SideNav() {
  const [Sidenavcomp, setSidenavcomp] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role == 1) {
      setSidenavcomp(AdminSidenavcomp);
    }
    if (role == 2) {
      setSidenavcomp(AccountSidenavcomp);
    }
    if (role == 3) {
      setSidenavcomp(EntrystaffSidenavcomp);
    }
    if (role == 4) {
      setSidenavcomp(StudentSidenavcomp);
    }
  }, []);

  return (
    <>
      {/* <AppBar> */}
      <div className="Sidenav">
        <div className="menuToggle">
          <icon id="hamburger">
            <MenuIcon />
          </icon>
        </div>
        <ul className="SidenavList">
          {Sidenavcomp.map((val, key) => {
            return (
              <li
                key={key}
                className="row"
                id={window.location.pathname === val.link ? "active" : ""}
                onClick={() => {
                  navigate(val.link);
                }}
              >
                <div id="navcomp">
                  <div id="icon">{val.icon}</div>
                  <div id="title"> {val.title}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default SideNav;
