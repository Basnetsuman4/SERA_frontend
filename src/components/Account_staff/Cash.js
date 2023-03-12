import React, { useRef, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "../../css/Cash.css";
import { useToken } from "../../apis";

function Cash() {
  const { tokenInstance } = useToken();
  const userName = useRef(null);
  const semester = useRef(null);
  const amount = useRef(null);
  const type = 2;

  const [postResult, setPostResult] = useState(null);
  const toggle = () => {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  };

  async function postData() {
    console.log("postData");
    const postData = {
      userName: userName.current.value,
      semester: parseInt(semester.current.value, 10),
      amount: parseFloat(amount.current.value, 10),
      type: type,
    };

    await tokenInstance
      .post(`/transaction`, postData)
      .then((res) => {
        console.log(res.data);
        setPostResult(res.data.message);
      })
      .catch((e) => {
        setPostResult(e.response.data.message);
      });
  }

  return (
    <>
      <div className="contain" id="blur">
        <div className="content">
          <div className="cash">
            <div className="cashHeader">
              <h2>Verify Cash Details</h2>
            </div>
            <div className="cashBody">
              <div className="cashForm">
                <Form>
                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      required
                      innerRef={userName}
                      placeholder="Enter Username"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleSelectSem">Select Semester</Label>
                    <Input
                      type="select"
                      name="selectSem"
                      id="exampleSelectSemester"
                      innerRef={semester}
                    >
                      <option disabled selected value="">--Choose--</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="exampleText">Amount</Label>
                    <Input
                      type="number"
                      name="text"
                      min={0}
                      id="exampleText"
                      placeholder="Enter The Paid Amount"
                      required
                      innerRef={amount}
                    />
                  </FormGroup>

                    <Button
                      id="subbtn"
                      onClick={() => {
                        setPostResult("Loading");
                        postData();
                        toggle();
                      }}
                    >
                      Submit
                    </Button>
                   
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="popup">
        <div id="test1" onClick={toggle} className="close">
          +
        </div>
        {postResult && (
          <div role="alert">
            <pre>{postResult}</pre>
          </div>
        )}

        <button id="test1" onClick={toggle}>
          Close
        </button>
      </div>
    </>
  );
}
export default Cash;
