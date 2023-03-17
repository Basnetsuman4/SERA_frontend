import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DescriptionIcon from "@mui/icons-material/Description";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LogoutIcon from "@mui/icons-material/Logout";
import PasswordIcon from "@mui/icons-material/Password";

import "../../css/Sidenavcomp.css";

export const AccountSidenavcomp = [
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
    icon: <DescriptionIcon />,
    link: "/secure/searchstudent",
  },
  {
    title: "Voucher",
    icon: <PersonAddIcon />,
    link: "/secure/voucher",
  },
  {
    title: "Payment",
    icon: <AutoGraphIcon />,
    link: "/secure/payment",
  },

  {
    title: "Log Out",
    icon: <LogoutIcon />,
    link: "/secure/confirmation",
  },
];
