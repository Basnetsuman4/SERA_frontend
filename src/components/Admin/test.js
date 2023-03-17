import React, { useState, useRef } from "react";
import "../css/ChangePassword.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useToken } from "../apis";
import { useAuth } from "../Authentication/auth";

const ChangePassword = () => {
  const [state1, setstate1] = useState(false);
  const [state2, setstate2] = useState(false);
  const [state3, setstate3] = useState(false);

  const toggleBtn1 = () => {
    setstate1((prevState) => !prevState);
  };
  const toggleBtn2 = () => {
    setstate2((prevState) => !prevState);
  };
  const toggleBtn3 = () => {
    setstate3((prevState) => !prevState);
  };
  const toggle = () => {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  };

  const { tokenInstance } = useToken();
  const currentPassword = useRef(null);
  const newPassword = useRef(null);
  const reEnteredPassword = useRef(null);
  const username = useAuth((state) => state.username);
  const [postresult, setpostresult] = useState("");

  function handleSubmit() {
    const putData = {
      currentPassword: currentPassword.current.value,
      newPassword: newPassword.current.value,
      reEnteredPassword: reEnteredPassword.current.value,
    };

    tokenInstance
      .post(`/password/update/${username}`, putData)
      .then((res) => {
        setpostresult(res.data.message);
        // console.log(res);
      })
      .catch((err) => {
        setpostresult(err.response.data.message);
        console.log(err);
      });
  }

  const [Password, setPassword] = useState("");
  const [valid, setValid] = useState(true);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\W)(?=.{8,})/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setValid(validatePassword(newPassword));
  };

  return (
    <>
      <div className="contrent" id="blur">
        <div className="CP">
          <div className="cardCP">
            <div className="test">
              <h4>
                <u>Password Requirement:</u>
              </h4>
              <div className="criteriaSS">
                <ul>
                  <li> Should start form uppercase</li>
                  <li> At least one lower case letter [a-z]</li>
                  <li> At least one upper case letter [A-Z]</li>
                  <li> At least one numberal [0-9]</li>
                  <li> At least one symbol[!@#$%^&*]</li>
                  <li> Minumum 8 characters</li>
                </ul>
                {!valid && (
                  <div style={{ color: "red" }}>
                    Password must start with uppercase, contain at least one
                    lowercase letter, special symbol, number and have a minimum
                    length of 8 characters.
                  </div>
                )}
              </div>
            </div>
            <div className="forpsw">
              <div className="CPtitle">
                <h2>Reset Password</h2>
              </div>
              <div className="CPbody">
                <Form>
                  <FormGroup>
                    <Label for="current-password">Current Password</Label>
                    <div className="ipic">
                      <Input
                        type={state1 ? "text" : "password"}
                        name="current-password"
                        id="currentPassword"
                        innerRef={currentPassword}
                      />
                      <span id="test1" onClick={toggleBtn1}>
                        {state1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="new-password">New Password</Label>
                    <div className="ipic">
                      <Input
                        type={state2 ? "text" : "password"}
                        name="new-password"
                        id="new-password"
                        value={Password}
                        onChange={handlePasswordChange}
                        innerRef={newPassword}
                        // placeholder="Enter New-Password"
                      />

                      <span id="test1" onClick={toggleBtn2}>
                        {state2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </span>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label for="reenter-new-password">
                      Confirm New Password
                    </Label>
                    <div className="ipic">
                      <Input
                        type={state3 ? "text" : "password"}
                        name="reenter-new-password"
                        id="reenter-new-password"
                        innerRef={reEnteredPassword}
                        // placeholder="Re-Enter New Password"
                      />
                      <span id="test1" onClick={toggleBtn3}>
                        {state3 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </span>
                    </div>
                  </FormGroup>
                </Form>
                <div className="btnsub">
                  <Button id="subbtn" type="submit">
                    Submit
                  </Button>
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
        {postresult && (
          <div role="alert">
            <pre>{postresult}</pre>
          </div>
        )}

        <button id="test1" onClick={toggle}>
          Close
        </button>
      </div>
    </>
  );
};

export default ChangePassword;
