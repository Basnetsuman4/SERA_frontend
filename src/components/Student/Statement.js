import React, { useEffect, useState } from "react";

import "../../css/Statement.css";
import { Card, CardHeader, CardBody } from "reactstrap";
import { useAuth } from "../../Authentication/auth";
import { useToken } from "../../apis";
import Individualstmt from "./Individualstmt";

function Statement() {
  const username = useAuth((state) => state.username);
  const [transactiondata, setData] = useState([]);
  const { tokenInstance } = useToken();

  useEffect(() => {
    tokenInstance
      .get(`/payment/details/${username}`)
      .then((res) => {
        const info = res.data;
        console.log(info);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(transactiondata);

  return (
    <>
      <Card>
        <CardHeader>
          <h1>Statement</h1>
        </CardHeader>

        <CardBody>
          <div className="statm-card">
            {transactiondata.map((singledata) => (
              <Individualstmt transactiondata={singledata} />
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Statement;
