import React, { useState } from "react";
import { useToken } from "../apis";
import "../css/ForgotPassword.css";
import { useAuth } from "../Authentication/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../apis";

export default function ForgotPswd() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
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
    const postData = {
      username: username,
      email: email,
    };

    axios
      .create(config)
      .post("/forgot/password", postData)
      .then((res) => {
        console.log(res);
        setMessage("Check your email ");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log(email);
  return (
    <>
      <div className="contain" id="blur">
        <div className="content">
          <div className="body">
            <div className="FPfbody">
              <div className="FPfBox">
                <div className="fformBox">
                  <form onSubmit={(e) => e.preventDefault()}>
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
                        placeholder="Enter username"
                        onChange={handleName}
                      />
                      <span>Email:</span>
                      <input
                        className="forAddress"
                        placeholder="example00@gmail.com"
                        onChange={handleEmail}
                      />
                    </div>
                    <div className="inputBx">
                      <button
                        name=""
                        onClick={() => {
                          postData();
                          toggle();
                          // navigate("/login");
                        }}
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
        <div id="test1" onClick={toggle} className="close">
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
