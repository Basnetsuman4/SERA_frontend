import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Label, Card } from "reactstrap";
import { useToken } from "../../apis";
import "../../css/SearchStudent.css";

export function Selection() {
  const navigate = useNavigate();
  const location = useLocation();
  const detail = location.state;
  // console.log("dd", detail);
  const facultyId = detail.person.faculty;
  let faculty = null;
  if (facultyId == 1) {
    faculty = "BCT - Bachelors in Computer Engineering";
  }
  if (facultyId == 2) {
    faculty = "BCE - Bachelors in Civil Engineering";
  }

  const [semester, setSemesterField] = useState();
  const username = detail.person.userName;

  const handlesemester = (e) => {
    setSemesterField(e.target.value);
  };

  const handleButtonClick = () => {
    if (detail.btnid == 1) {
      navigate("/secure/searchstudent/marksentry", {
        state: {
          username: username,
          semester: semester,
          faculty: facultyId,
        },
      });
    }
    if (detail.btnid == 2) {
      navigate("/secure/searchstudent/viewresult", {
        state: {
          username: username,
          semester: semester,
          faculty: facultyId,
        },
      });
    }
    if (detail.btnid == 3) {
      navigate("/secure/searchstudent/editresult", {
        state: {
          username: username,
          semester: semester,
          faculty: facultyId,
        },
      });
    }
  };
  return (
    <>
      <Card>
        <div className="sections">
          <div className="selectsection">
            <div className="stream">
              <Label for="exampleSelect">Stream</Label>
              <Input type="select" name="selectStream" id="selectStream">
                <option disabled selected value="">
                  {faculty}
                </option>
              </Input>
            </div>
            <div className="stream">
              <Label for="exampleSelect">Semester</Label>
              <Input
                type="select"
                name="selectSemester"
                id="selectSemester"
                onChange={handlesemester}
              >
                <option disabled selected value="">
                  --Choose--{" "}
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
          </div>
          <div className="btnsection">
            <div className="inputBx">
              <input
                type="submit"
                id="searchbtn"
                value="Search"
                onClick={handleButtonClick}
              />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
