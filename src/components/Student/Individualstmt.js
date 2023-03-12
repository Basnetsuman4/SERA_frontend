import { useEffect, useState } from "react";
import "../../css/Statement.css";
function Individualstmt({ transactiondata }) {
  console.log("i", transactiondata);
  const [type, setType] = useState();
  useEffect(() => {
    if (transactiondata.type == 1) setType("Bill added");
    if (transactiondata.type == 2) setType("Bill paid");
    if (transactiondata.type == 3) setType("Scholarship added");
  }, []);
  return (
    <>
      <div className="indiviStatmCard">
        <div className="row">
          <div className="col" id="col1">
            <span> {transactiondata.semester.name} </span>
          </div>
          <div className="col" id="col3">
            <p>{transactiondata.date}</p>
          </div>
          <div className="col" id="col4">
            <p>{transactiondata.amount}</p>
          </div>
          <div className="col" id="col2">
            <p>{type}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Individualstmt;
