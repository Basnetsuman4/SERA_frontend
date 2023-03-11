import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Label } from "reactstrap";
import { useToken } from "../../apis";

export function Selection() {
  const navigate = useNavigate();
  const location = useLocation();
  const detail = location.state;

  const [semester, setSemesterField] = useState();
  const [faculty, setFacultyField] = useState();
  const username = detail.person.userName;

  const handlesemester = (e) => {
    setSemesterField(e.target.value);
  };
  const handlefaculty = (e) => {
    setFacultyField(e.target.value);
  };
  const handleButtonClick = () => {
    if (detail.btnid == 1) {
      navigate("/secure/searchstudent/marksentry", {
        state: {
          username: username,
          semester: semester,
          faculty: faculty,
        },
      });
    }
    if (detail.btnid == 2) {
      navigate("/secure/searchstudent/viewresult", {
        state: {
          username: username,
          semester: semester,
          faculty: faculty,
        },
      });
    }
    if (detail.btnid == 3) {
      navigate("/secure/searchstudent/editresult", {
        state: {
          username: username,
          semester: semester,
          faculty: faculty,
        },
      });
    }
  };
  return (
    <>
      <div className="semester">
        <Label for="exampleSelect">Semester</Label>
        <Input
          type="select"
          name="selectSemester"
          id="selectSemester"
          onChange={handlesemester}
        >
          <option>-Choose-- </option>
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
      <div className="btnsection">
        <div className="inputBx">
          <input
            type="submit"
            id="submitbtn"
            value="Submit"
            name=""
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </>
  );
}
