import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Label } from "reactstrap";
import { useToken } from "../../apis";
import "../../css/BulkEntry.css";




export function BulkEntry() {
  const [postresult, setpostresult] = useState("");
  const { tokenInstance } = useToken();
  const [batch, setBatchField] = useState();
  const [faculty, setFacultyField] = useState();
  const [amount, setAmountField] = useState();

  const handleSemesterClick = () => {
    setpostresult("Loading");
    tokenInstance
      .post(`/upgrade/semester`)
      .then((res) => {
        setpostresult(res.data.message);
        console.log(res);
      })
      .catch((err) => {
        setpostresult(err.response.data.message);
        console.log(err);
      });
    toggle();
  };

  const handleButtonClick = () => {
    setpostresult("Loading");
    const postData = {
      batch: batch,
      faculty: parseInt(faculty, 10),
      amount: parseFloat(amount, 10),
    };
    tokenInstance
      .post(`/bulk`, postData)
      .then((res) => {
        setpostresult(res.data.message);
        console.log(res);
      })
      .catch((err) => {
        setpostresult(err.response.data.message);
        console.log(err);
      });
    toggle();
  };
  const handlebatch = (e) => {
    setBatchField(e.target.value);
  };
  const handlefaculty = (e) => {
    setFacultyField(e.target.value);
  };
  const handleamount = (e) => {
    setAmountField(e.target.value);
  };
  const toggle = () => {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  };
  return (
    <>
      <div className="contain" id="blur">
        <div className="bulk">
          <div className="bulkBody">
            {/* <div className="BBupgrade">
              <div className="upgradeDiv">
                <span>Upgrade students to next semester? </span>
                <div id="fUpgradeBtn">
                  <button
                    type="submit"
                    value="Upgrade"
                    name=""
                    id="btn"
                    onClick={handleButtonClick}
                  >Upgrade</button>
                </div>
              </div>
            </div>
            <div className="BBfeeupgrade">
              <div className="FUhead">
                <span>Fee Entry</span>
              </div>
              <div className="FUbody">
                <div className="stream">
                  <Label for="exampleSelect">Stream</Label>
                  <Input
                    type="select"
                    name="selectStream"
                    id="selectStream"
                    onChange={handlefaculty}
                  >
                    <option disabled selected value="">--Choose-- </option>
                    <option value="1">BCT - Bachelors in Computer Engineering</option>
                    <option value="2">BCE - Bachelors in Civil Engineering</option>
                  </Input>
                </div>
                <div className="batch">
                  <Label for="exampleSelect">Batch</Label>
                  <Input
                    type="text"
                    id="selectBatch"
                    name=""
                    placeholder="Enter batch"
                    onChange={handlebatch}
                  />
                </div>
                <div className="amount">
                  <Label for="exampleSelect">Amount</Label>
                  <Input
                    type="text"
                    id="selectAmount"
                    name=""
                    placeholder="Enter semester fee"
                    onChange={handleamount}
                  />
                </div>
              </div>
              <div className="fUpgradeBtn">
                <button
                  type="submit"
                  value="Upgrade"
                  name=""
                  id="btn"
                  onClick={handleButtonClick}>
                  Upgrade
                </button>
              </div>

            </div> */}
            <div className="confirmationDiv">
              <span>Confirm Upgrade?</span>
              <div className="CUbtns">
                <div id="fUpgradeBtn">
                  <button
                    id="btn"
                  >Yes</button>
                </div>
                <div id="fUpgradeBtn">
                  <button
                    id="btn"
                  >No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="popup">
        <div onClick={toggle} className="close">
          +
        </div>
        <h2> {postresult}</h2>
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
}
