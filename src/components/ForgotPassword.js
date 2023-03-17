import React, { useState, useRef } from "react";
import { useToken } from "../apis";
import "../css/ForgotPassword.css";
import { useAuth } from "../Authentication/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../apis";

export default function ForgotPswd() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const { tokenInstance } = useToken();
  const setMessage = useAuth((state) => state.setMessage);

  const toggle = () => {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  };

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handleName(e) {
    setUsername(e.target.value);
  }
  function postData() {
    setMessage("Loading ");
    const postData = {
      username: username,
      email: email,
    };
    console.log(postData);
    axios
      .create(config)
      .post("/forgot/password", postData)
      .then((res) => {
        console.log(res);
        // setMessage("Check your email ");
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setMessage(err.response.data.message);
      });
    toggle();
  }
  // console.log(email);

  const [postResult, setPostResult] = useState(null);

  const userName = useRef(null);

  const handleSubmit = (e) => {
    // e.preventDefault();
    // if (firstName !== "" && lastName !== "" && password !== "") {
    if (
      !userName.current.value &&
      !email.current.value
    ) {
      console.log("Please fill out all fields before submitting");
    } else {
      console.log("Form is ready to submit");
      setPostResult("Loading");
      postData();
      toggle();
    }
  };
  return (
    <>
      <div className="contain" id="blur">
        <div className="content">
          <div id="dash_clock" style={{ display: "none" }}></div>

          <div className="body">
            <div className="FPfbody">
              <div className="FPfBox">
                <div className="fformBox">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();

                  }}>
                    <h2>Forgot Password?</h2>
                    <div className="paragraph">
                      <span>
                        Please enter the valid username and email address linked
                        to your account to receive further details.
                      </span>
                    </div>

                    <div className="useremail">
                      <span>Username:</span>
                      <input
                        className="forName"
                        required
                        name="userName"
                        placeholder="Enter username"
                        onChange={handleName}
                      />
                      <span>Email:</span>
                      <input
                        required
                        className="forAddress"
                        placeholder="example00@gmail.com"
                        onChange={handleEmail}
                      />
                    </div>
                    <div className="inputBx">
                      <button
                        name=""
                      // onClick={() => {
                      // postData();
                      // toggle();
                      // navigate("/login");
                      // }}
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="popup">
        <div
          id="test1"
          onClick={() => {
            toggle();
            navigate("/login");
          }}
          className="close"
        >
          +
        </div>

        <div role="alert">
          <pre>Check your email for further details.</pre>
        </div>

        <button
          id="test1"
          onClick={() => {
            toggle();
            navigate("/login");
          }}
        >
          Close
        </button>
      </div>
    </>
  );
}
