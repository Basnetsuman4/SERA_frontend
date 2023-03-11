import React from "react";
import { Table, CardHeader, Input } from "reactstrap";
import "../../css/ResultForm.css";
import { Card, CardBody } from "reactstrap";
import { useToken } from "../../apis";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditResult() {
  const location = useLocation();
  const detail = location.state;
  const navigate = useNavigate();
  const [postresult, setpostresult] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [Result, setResult] = useState([]);
  const { tokenInstance } = useToken();
  const [mark, setMark] = useState([]);
  useEffect(() => {
    setMark([]);
    console.log(mark);
    // tokenInstance
    //   .get(`/subject/${detail.faculty}/${detail.semester}`)
    //   // .get(`/subject/1/2`)
    //   .then((res) => {
    //     console.log(res);
    //     setSubjects(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    tokenInstance
      .get(`/mark/${detail.username}/${detail.semester}`)
      .then((res) => {
        console.log(res);
        setResult(res.data);
        setSubjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(Result);

  if (mark.length == 0) {
    for (let i = 0; i < subjects.length; i++) {
      const sub_id = subjects[i].id;
      console.log(sub_id);
      const initmark = Result[i].marks;
      setMark((mark) => [...mark, { id: sub_id, mark: initmark }]);
    }
  }
  console.log(mark);

  const toggle = () => {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  };

  function Marksentry({ subject }) {
    const handleChange = (e) => {
      e.preventDefault();
      let [...marklist] = mark;
      const { id, value } = e.target;

      for (let i = 0; i < marklist.length; i++) {
        if (id == marklist[i].id) {
          marklist[i] = { ...marklist[i], mark: parseFloat(value, 10) };
        }
      }

      setMark(marklist);
    };
    console.log(mark);

    return (
      <>
        <tr>
          <td>{subject.subject} </td>
          <td>{subject.full_marks}</td>
          <td>{subject.pass_marks}</td>
          <td>
            <Input
              id={subject.id}
              name="inputmarks"
              required
              defaultValue={subject.marks}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </td>
        </tr>
      </>
    );
  }

  function handleSubmit() {
    tokenInstance
      .post(`/mark/update/${detail.username}/${detail.semester}`, mark)
      .then((res) => {
        setpostresult(res.data.message);
        console.log(res);
      })
      .catch((err) => {
        setpostresult(err.response.data.message);
        console.log(err);
      });
    toggle();
  }
  return (
    <>
      <div className="contain" id="blur">
        <div className="content">
          <div>
            <Card className="Card">
              <CardHeader className="CardHeader">
                <h1>Add Results</h1>
              </CardHeader>

              <CardBody>
                <form onSubmit={(e) => e.preventDefault()}>
                  <Table responsive>
                    <thead>
                      <tr>
                        {/* <th>Sub_ID</th> */}
                        <th>Subject</th>
                        <th>Total Mark</th>
                        <th>Pass Mark</th>
                        <th>Obtained Mark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Result.map((subject) => Marksentry({ subject }))}
                    </tbody>
                  </Table>
                  <div className="inputBx">
                    <button
                      name=""
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
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
            navigate("/secure/searchstudent");
          }}
        >
          Close
        </button>
      </div>
    </>
  );
}

export default EditResult;
