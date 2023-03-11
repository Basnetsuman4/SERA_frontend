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
  const batches = ["2076", "2077", "2078", "2079"];

  function postData() {
    const postdata = {
      batch: batchField,
      faculty: facultyField,
    };
    tokenInstance
      .post(`/student/details`, postdata)
      .then((res) => {
        console.log(res);
        const data = res.data;
        setfilteredPersons(data);
      })
      .catch((e) => {
        console.log(e);
      });
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
                <option>-Choose-- </option>
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
                <option>-Choose-- </option>
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
        {filteredPersons.length == 0 && (
          <CardBody className="SCard">
            <div className="search-card">
              <p>No results found</p>
            </div>
          </CardBody>
        )}
        {filteredPersons && (
          <CardBody className="SCard">
            <div className="search-card">
              {filteredPersons.map((person) => (
                <>
                  <div className="individualCard">
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
                      {/* <div className="id">
                        <span>{person.id}</span>
                      </div> */}
                    </div>
                    <div className="option">
                      <div className="viewBtn">
                        <button
                          id="view"
                          onClick={() =>
                            navigate("updatebill", {
                              state: { ...person },
                            })
                          }
                        >
                          Update Bill
                        </button>
                      </div>
                      <div className="viewBtn">
                        <button
                          id="view"
                          onClick={() =>
                            navigate("updatescholarship", {
                              state: { ...person },
                            })
                          }
                        >
                          Update Scholarship
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </CardBody>
        )}
      </Card>
    </>
  );
};

export default SearchStudent;
