import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import { Icon } from "@mui/material";
import { useAuth } from "../Authentication/auth";
import { useToken } from "../apis";

const Dashboard = (props) => {
  const [data, setData] = useState([]);
  const username = useAuth((state) => state.username);
  const { tokenInstance } = useToken();
  useEffect(() => {
    tokenInstance
      .get(`/details/${username}`)
      .then((res) => {
        // console.log(res.data);
        const info = res.data;
        setData(info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="dashboard">
        <div className="dash_header">
          <div className="clockDiv">
            <div id="dash_clock">
              {/* 00:00:00 */}
              <span id="hrs">00 </span>:<span id="min">00 </span>:
              <span id="sec">00 </span>
              <span id="session"> AM</span>
            </div>
          </div>
          <div className="notification_div">
            <div className="badge">
              <Icon id="bellIcon">{/* <NotificationsIcon /> */}</Icon>
            </div>
          </div>
          <div className="userName_div">
            <div className="showUser">
              <div className="userName">
                <div className="name">
                  {data.firstName} {data.lastName}
                </div>
              </div>
              <div className="userImage">
                <img
                  id="img-profile"
                  src={data.image}
                  alt="default"
                  rel="norefferer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="dash_separator"></div>

        <div className="dash_body">
          {props.comp}
          {/* props.comp vaneko Dashboard ma pass gareko element hoo  */}
        </div>
      </div>
    </>
  );
};

function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  if (hh === 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss + " " + session;

  document.getElementById("dash_clock").textContent = time;
  // console.log(document.getElementById("dash_clock"));
  let t = setTimeout(function () {
    currentTime();
  }, 1000);
}
setInterval(currentTime, 100);

export default Dashboard;
