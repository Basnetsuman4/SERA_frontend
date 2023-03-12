import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { CardBody, CardHeader } from "reactstrap";
import { useToken } from "../../apis";

export function ViewResult() {
  const location = useLocation();
  const detail = location.state;
  const navigate = useNavigate();
  // const [postresult, setpostresult] = useState("");
  const [result, setResult] = useState([]);
  const { tokenInstance } = useToken();
  // const username = useAuth((state) => state.username);
  const [mark, setMark] = useState([]);
  useEffect(() => {
    setMark([]);
    console.log(mark);
    tokenInstance
      .get(`/mark/${detail.username}/${detail.semester}`)
      .then((res) => {
        console.log(res);
        setResult(res.data);
      })
      .catch((err) => {
        setResult(null);
        console.log(err);
      });
  }, []);
  console.log(result);
  function Marksview({ subject }) {
    return (
      <>
        <tr>
          {/* <th scope="row">{subject.id}</th> */}
          <td>{subject.subject} </td>
          <td>{subject.full_marks}</td>
          <td>{subject.pass_marks}</td>
          <td>{subject.marks}</td>
        </tr>
      </>
    );
  }

  return (
    <>
      <div>
        <Card className="Card">
          <CardHeader className="CardHeader">
            <h1>View Result</h1>
          </CardHeader>
          <CardBody>
            {result.length == 0 && <div>No result found.</div>}
            {result.length != 0 && (
              <Table responsive>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Total Mark</th>
                    <th>Pass Mark</th>
                    <th>Obtained Mark</th>
                  </tr>
                </thead>
                <tbody>{result.map((subject) => Marksview({ subject }))}</tbody>
              </Table>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
}
