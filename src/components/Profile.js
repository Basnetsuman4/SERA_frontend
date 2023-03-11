import React, { useEffect, useState } from "react";
import { useAuth } from "../Authentication/auth";
import { useToken } from "../apis";

const Profile = () => {
  const { tokenInstance } = useToken();
  const [data, setData] = useState([]);
  const username = useAuth((state) => state.username);
  const role = useAuth((state) => state.role);
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    tokenInstance
      .get(`/details/${username}`)
      .then((res) => {
        const info = res.data;
        // console.log(info);
        setData(info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (role == 4) {
      if (data.faculty == 1) {
        setFaculty("BCT - Bachelors in Computer Engineering");
      }
      if (data.faculty == 2) {
        setFaculty("BCE - Bachelors in Civil Engineering");
      }
      // console.log(faculty);
    }
  }, [data]);
  return (
    <>
      <div className="header">
        <div className="greet">
          <div className="message">
            <div className="greet_mgs">Hey, {data.userName}</div>
            <div className="back">Welcome back, nice to meet you again.</div>
          </div>
          <div className="profile-image">
            <img
              id="img-profile"
              src={data.image}
              alt="demo"
              rel="norefferer"
            />
          </div>
        </div>
      </div>
      {role == 1 && (
        <div className="profile_info">
          <div className="infoContainer">
            <div className="infoTitle">Personal Information:</div>
            <div className="dash_separator"></div>
            <div className="informations">
              <div className="fullName">
                Full Name: {data.firstName} {data.lastName}
              </div>
              <div className="userName">UserName: {data.userName}</div>
              <div className="contact">Contact: {data.contact_no}</div>
              <div className="address">Address: {data.address}</div>
              <div className="email">Email: {data.email}</div>
            </div>
          </div>
        </div>
      )}
      {(role == 2 || role == 3) && (
        <div className="profile_info">
          <div className="infoContainer">
            <div className="infoTitle">Personal Information:</div>
            <div className="dash_separator"></div>
            <div className="informations">
              <div className="fullName">
                Full Name: {data.firstName} {data.lastName}
              </div>
              <div className="userName">UserName: {data.userName}</div>
              <div className="contact">Contact: {data.contact_no}</div>
              <div className="address">Address: {data.address}</div>
              <div className="email">Email: {data.email}</div>
            </div>
          </div>
        </div>
      )}
      {role == 4 && (
        <div className="profile_info">
          <div className="infoContainer">
            <div className="infoTitle">Personal Information:</div>
            <div className="dash_separator"></div>
            <div className="informations">
              <div className="fullName">
                Full Name: {data.firstName} {data.lastName}
              </div>
              <div className="userName">UserName: {data.userName}</div>
              <div className="contact">Contact: {data.contact_no}</div>
              <div className="address">Address: {data.address}</div>
              <div className="email">Email: {data.email}</div>
              <div className="faculty">Faculty: {faculty}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Profile;
