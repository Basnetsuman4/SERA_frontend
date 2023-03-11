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
        console.log(err);
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
              <div className="statm-card">
                <Form className="AccFormInfo">
                  <div className="inputSection">
                    <FormGroup className="name">
                      <Label for="FullName">Full Name</Label>
                      <div className="naming">
                        <p>
                          {data.firstName} {data.lastName}
                        </p>
                      </div>
                    </FormGroup>

                    <FormGroup className="Identity">
                      <Label for="username">Username</Label>
                      <p>{data.userName}</p>
                    </FormGroup>
                    <FormGroup className="batch">
                      <Label for="exampleBatch">Batch</Label>
                      <p>{data.batch}</p>

                      <Label for="examplesem">Semester</Label>
                      <p>{data.semester}</p>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleSelect">
                        Select which Semester to set Amount to{" "}
                      </Label>
                      <Input
                        type="select"
                        name="selectStream"
                        id="selectStream"
                        onChange={handlesemester}
                      >
                        <option>--Choose--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                      </Input>
                    </FormGroup>

                    <FormGroup className="Contract">
                      <Label for="dueFee">Amount Fee</Label>
                      <Input
                        type="number"
                        name="dueFee"
                        id="dueFee"
                        placeholder="Enter Amount Fee "
                        min="0"
                        innerRef={amount}
                      />
                    </FormGroup>
                  </div>
                  <div className="sub-btn">
                    <Button
                      variant="primary"
                      onClick={() => {
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
        <div onClick={toggle} className="close">
          +
        </div>
        <h2> {postResult}</h2>
        {/* <p>Send email following the payment notice?</p> */}
        <button
          onClick={() => {
            toggle();
          }}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default UpdateBill;
