import React, { useEffect, useState, useRef } from "react";
import "../../css/UpdateBill.css";

import { useToken } from "../../apis";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CardHeader,
  Card,
  CardBody,
} from "reactstrap";
import { useLocation } from "react-router-dom";

const UpdateBill = () => {
  const { tokenInstance } = useToken();
  const [data, setData] = useState([]);
  const location = useLocation();
  const detail = location.state;
  // console.log(detail);
  const amount = useRef(null);
  const [semester, setSemester] = useState(null);

  const [postResult, setPostResult] = useState(null);

  useEffect(() => {
    tokenInstance
      .get(`/details/${detail.userName}`)
      .then((res) => {
        const info = res.data;
        console.log(info);
        setData(info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const toggle = () => {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  };
  function handleSubmit() {
    const postData = {
      semester: parseInt(semester, 10),
      userName: detail.userName,
      amount: parseFloat(amount.current.value, 10),
      type: 1,
    };

    tokenInstance
      .post("/transaction", postData)
      .then((res) => {
        // console.log(res);
        setPostResult(res.data.message);
      })
      .catch((err) => {
        // console.log(err);
        setPostResult(err.response.data.message);
      });
  }
  const handlesemester = (e) => {
    setSemester(e.target.value);
  };

  return (
    <>
      <div className="contain" id="blur">
        <div className="content">
          <Card>
            <CardHeader>
              <h1>Billing</h1>
            </CardHeader>

            <CardBody>
              <div className="billing">
                <Form className="AccFormInfo">
                  <div className="inputSection">
                    <FormGroup className="name">
                      <div className="forIndentation">
                        <Label for="FullName">Full Name:</Label>
                      </div>
                      <div className="IndentationData">
                        {data.firstName} {data.lastName}
                      </div>
                    </FormGroup>

                    <FormGroup className="Identity">
                      <div className="forIndentation">
                        <Label for="username">Username:</Label>
                      </div>
                      <div className="IndentationData">{data.userName}</div>
                    </FormGroup>

                    <FormGroup className="batch">
                      <div className="forIndentation">
                        <Label for="exampleBatch">Batch:</Label>
                      </div>
                      <div className="IndentationData">{data.batch}</div>
                    </FormGroup>

                    <FormGroup className="sem">
                      <div className="forIndentation">
                        <Label for="examplesem">Semester:</Label>
                      </div>
                      <div className="IndentationData">{data.semester}</div>
                    </FormGroup>

                    <FormGroup>
                      <div className="forIndentation">
                        <Label for="exampleSelect">
                          Select which Semester to set Amount to{" "}
                        </Label>
                      </div>
                      <div className="IndentationData">
                        <Input
                          type="select"
                          name="selectStream"
                          id="selectStream"
                          onChange={handlesemester}
                        >
                          <option disabled selected value="">
                            --Choose--
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                        </Input>
                      </div>
                    </FormGroup>

                    <FormGroup className="Contract">
                      <div className="forIndentation">
                        <Label for="dueFee">Amount Fee</Label>
                      </div>
                      <div className="IndentationData">
                        <Input
                          type="number"
                          name="dueFee"
                          id="ub"
                          placeholder="Enter Amount"
                          min="0"
                          innerRef={amount}
                        />
                      </div>
                    </FormGroup>
                  </div>
                  <div className="sub-btn">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setPostResult("Loading");
                        handleSubmit();
                        toggle();
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <div id="popup">
        <div
          onClick={() => {
            toggle();
            window.location.reload(true);
          }}
          className="close"
        >
          +
        </div>
        <h2> {postResult}</h2>
        {/*  Send email following the payment notice?  */}
        <button
          onClick={() => {
            toggle();
            window.location.reload(true);
          }}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default UpdateBill;
