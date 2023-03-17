import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToken } from "../../apis";
import "../../css/imgcomp.css";

export function ImageComponent() {
  const { tokenInstance } = useToken();
  const { state } = useLocation();
  const [voucher_id, setVoucher] = useState(null);
  const [postResult, setPostResult] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setVoucher(state.detail.voucher_id);
  }, []);

  const showResultPopup = () => {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  };

  function handleVerify(isAccepted) {
    setPostResult("Loading..");
    const postData = {
      validity: isAccepted,
      voucher_id: voucher_id,
    };
    console.log(postData);
    tokenInstance
      .post("verify/voucher", postData)
      .then((res) => {
        console.log(res);
        setPostResult(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setPostResult(err.data.message);
      });
  }

  return (
    <>
      <div className="contain" id="blur">
        <div className="content">
          <div className="verBody">
            <div className="verVouImg">
              <img className="small" src={state.detail.image} alt="Voucher" />
            </div>
            <div className="AmountSem">
              <div className="AS">
                <h4> Amount: {state.detail.amount}</h4>
                <h4> Semester: {state.detail.semester}</h4>
              </div>
              <div className="divFIC">
                <button
                  id="btn"
                  onClick={() => {
                    handleVerify(true);
                    showResultPopup();
                  }}
                >
                  Accept
                </button>
                <button
                  id="btn"
                  onClick={() => {
                    handleVerify(false);
                    showResultPopup();
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="popup">
        <div
          id="test1"
          onClick={() => {
            showResultPopup();
            navigate("/secure/voucher");
          }}
          className="close"
        >
          +
        </div>
        {postResult && (
          <div role="alert">
            <pre>{postResult}</pre>
          </div>
        )}

        <button
          id="test1"
          onClick={() => {
            showResultPopup();
            navigate("/secure/voucher");
          }}
        >
          Close
        </button>
      </div>
    </>
  );
}
