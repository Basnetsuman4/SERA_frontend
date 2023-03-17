import React, { useEffect, useRef, useState } from "react";
import "../../css/SearchStudent.css";
import { Card, CardHeader, CardBody, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../apis";

const SearchStudent = () => {
  const navigate = useNavigate();
  const { tokenInstance } = useToken();
  const [filteredPersons, setfilteredPersons] = useState([]);
  const [batchField, setBatchField] = useState();
  const [facultyField, setFacultyField] = useState();
  const batches = ["2075", "2076", "2077", "2078"];

  function postData() {
    const postdata = {
      batch: batchField,
      faculty: facultyField,
    };
    tokenInstance
      .post("/student/details", postdata)
      .then((res) => {
        // console.log(res);
        const data = res.data;
        setfilteredPersons(data);
      })
      .catch((e) => {
        console.log(e);
      });
    // console.log(filteredPersons);
  }

  const handlebatch = (e) => {
    setBatchField(e.target.value);
  };
  const handlefaculty = (e) => {
    setFacultyField(e.target.value);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <h1>SEARCH STUDENT</h1>
        </CardHeader>

        <div className="sections">
          <div className="selectsection">
            <div className="stream">
              <Label for="exampleSelect">Batch</Label>
              <Input
                type="select"
                name="selectStream"
                id="selectStream"
                onChange={handlebatch}
              >
                <option disabled selected value="">
                  --Select--{" "}
                </option>
                {batches.map((batch) => (
                  <option>{batch}</option>
                ))}
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
                <option disabled selected value="">
                  --Select--
                </option>
                <option value="1">
                  BCT - Bachelors in Computer Engineering
                </option>
                <option value="2">BCE - Bachelors in Civil Engineering</option>
              </Input>
            </div>
          </div>
          <div className="btnsection">
            <div className="inputBx">
              <input
                type="submit"
                id="searchbtn"
                value="Search"
                name=""
                onClick={() => {
                  postData();
                }}
              />
            </div>
          </div>
        </div>
        <div className="CardFSearchStd">
          <div className="searchStudentCard">
            {filteredPersons.length == 0 && (
              <div className="search-card">
                <p>No results found</p>
              </div>
            )}
            {filteredPersons && (
              <div className="search-card">
                {filteredPersons.map((person) => (
                  <>
                    <div className="individualCardd">
                      <ul>
                        <div className="imageSec">
                          <img
                            id="img-profile"
                            src={person.image}
                            alt="demo"
                            rel="norefferer"
                          />
                        </div>
                        <div className="nameId">
                          <div className="name">
                            <span>
                              {person.firstName} {person.lastName}
                            </span>
                          </div>
                        </div>
                        <div className="option">
                          <div className="selectBtn">
                            <button
                              id="searchbtn"
                              onClick={() =>
                                navigate("/secure/searchstudent/selection", {
                                  state: { person: person, btnid: 1 },
                                  replace: true,
                                })
                              }
                            >
                              Upload Results
                            </button>
                          </div>
                          <div className="selectBtn">
                            <button
                              id="searchbtn"
                              onClick={() =>
                                navigate("/secure/searchstudent/selection", {
                                  state: { person: person, btnid: 2 },
                                })
                              }
                            >
                              View Results
                            </button>
                          </div>
                          <div className="selectBtn">
                            <button
                              id="searchbtn"
                              onClick={() =>
                                navigate("/secure/searchstudent/selection", {
                                  state: { person: person, btnid: 3 },
                                })
                              }
                            >
                              Edit Results
                            </button>
                          </div>
                        </div>
                      </ul>
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default SearchStudent;
