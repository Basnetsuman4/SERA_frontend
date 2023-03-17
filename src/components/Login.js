import React, { useState, useRef, useEffect } from "react";
import { useLogin } from "../apis";
import { useNavigate } from "react-router-dom";
import SERAlogo from "./image/SERAlogo.svg";
import "../css/Login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../Authentication/auth";

export default function Login() {
  const username = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const [postResult, setPostResult] = useState(null);
  const message = useAuth((state) => state.message);
  let isError = useState(false);
  // let postResult = useState(null);

  const { login } = useLogin();

  async function postData() {
    try {
      const isLoggedIn = await login({
        username: username.current.value,
        password: password.current.value,
      });

      isError = !isLoggedIn;

      if (!isLoggedIn) {
        setPostResult(` ${sessionStorage.getItem("errmsg")}`);

        // console.log(postResult);
        return;
      }
      navigate("/secure");
    } catch (err) {
      console.log(err);
    }
  }

  const [state, setstate] = useState(false);
  const toggleBtn = () => {
    setstate((prevState) => !prevState);
  };

  return (
    <>
      <div className="box">
        <div className="divlogo">
          <div className="logo">
            <img src={SERAlogo} alt="Logo" />
          </div>
        </div>
        <div id="dash_clock" style={{ display: "none" }}></div>

        <div className="loginBox">
          <div className="formBox">
            <h2>Login</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="inputBx">
                <span>Username</span>
                <input
                  className="type"
                  type="text"
                  name="name"
                  autoComplete="none"
                  ref={username}
                  placeholder="Enter Username"
                />
              </div>
              <div className="inputBx">
                <span>Password</span>
                <div className="pswd">
                  <input
                    className="type"
                    type={state ? "text" : "password"}
                    name=""
                    ref={password}
                    placeholder="Enter Password"
                  />
                  <span onClick={toggleBtn}>
                    {state ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </span>
                </div>
              </div>

              <div
                className="forgetpswd"
                onClick={() => {
                  navigate("/forgotpassword");
                }}
              >
                Forgot Password?
              </div>
              {isError && (
                <div className="displayMessage">
                  <span> {postResult}</span>
                </div>
              )}

              <div className="inputBx">
                <input
                  type="submit"
                  value="Sign in"
                  name=""
                  onClick={() => {
                    postData();
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
