import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Label } from "reactstrap";
import { useToken } from "../../apis";

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
        <div className="content">
          <div className="btnsection">
            <div className="inputBx">
              <h4>Upgrade students to next semester</h4>
              <button
                type="submit"
                id="submitbtn"
                name=""
                onClick={handleSemesterClick}
              >
                Upgrade
              </button>
            </div>
          </div>
          <div className="stream">
            <Label for="exampleSelect">Stream</Label>
            <Input
              type="select"
              name="selectStream"
              id="selectStream"
              onChange={handlefaculty}
            >
              <option>-Choose-- </option>
              <option value="1">BCT - Bachelors in Computer Engineering</option>
              <option value="2">BCE - Bachelors in Civil Engineering</option>
            </Input>
          </div>
          <div className="batch">
            <Input
              type="text"
              id="selectBatch"
              name=""
              placeholder="Enter batch"
              onChange={handlebatch}
            />
          </div>
          <div className="amount">
            <Input
              type="text"
              id="selectAmount"
              name=""
              placeholder="Enter semester fee"
              onChange={handleamount}
            />
          </div>
          <div className="button">
            <button
              type="submit"
              id="submitbtn"
              value="Submit"
              name=""
              onClick={handleButtonClick}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* <div id="popup">
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
        </div> */}

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
