import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import DescriptionIcon from "@mui/icons-material/Description";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import LogoutIcon from "@mui/icons-material/Logout";
import PasswordIcon from "@mui/icons-material/Password";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import "../../css/Sidenavcomp.css";

export const StudentSidenavcomp = [
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
    title: "Payment",
    icon: <AccountBalanceWalletIcon />,
    link: "/secure/payment",
  },
  {
    title: "Results",
    icon: <LibraryBooksIcon />,
    link: "/secure/selection",
  },
  {
    title: "Progress",
    icon: <AutoGraphIcon />,
    link: "/secure/progressgraph",
  },
  {
    title: "Log Out",
    icon: <LogoutIcon />,
    link: "/secure/confirmation",
  },
];
