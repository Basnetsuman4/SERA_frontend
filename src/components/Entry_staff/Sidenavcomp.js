import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import LogoutIcon from "@mui/icons-material/Logout";
import PasswordIcon from "@mui/icons-material/Password";

import "../../css/Sidenavcomp.css";

export const EntrystaffSidenavcomp = [
  {
    title: "Profile",
    icon: <AccountCircleIcon />,
    link: "/secure/profile",
  },
  {
    title: "Password",
    icon: <PasswordIcon />,
    link: "/secure/changepassword",
  },
  {
    title: "Search",
    icon: <PasswordIcon />,
    link: "/secure/searchstudent",
  },
  {
    title: "Bulk",
    icon: <PasswordIcon />,
    link: "/secure/bulkentry",
  },

  {
    title: "Log Out",
    icon: <LogoutIcon />,
    link: "/secure/confirmation",
  },
];
