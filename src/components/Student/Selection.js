import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Label } from "reactstrap";
import { useToken } from "../../apis";
import "../../css/Selection.css";


export function Selection() {
  const navigate = useNavigate();
  const location = useLocation();
  // const detail = location.state;
  // console.log(detail);

  const [semester, setSemesterField] = useState();
  const username = sessionStorage.getItem("user");

  const handlesemester = (e) => {
    setSemesterField(e.target.value);
  };

  return (
    <>
      <div className="semesterResults">
        <div className="FindResultHead">
          <Label for="exampleSelect">Select Semester</Label>
        </div>
        <div className="FindResultBody">
        <div>
          <Input
            type="select"
            name="selectSemester"
            id="selectSemester"
            onChange={handlesemester}
          >
            <option disabled selected value="">--Choose-- </option>
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

        <div className="btnsectionForResult">
          <div className="inputBx">
            <button
              id="submitbtn"
              name=""
              onClick={() =>
                navigate("/secure/viewresult", {
                  state: {
                    username: username,
                    semester: semester,
                  },
                })
              }
            >Submit</button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
