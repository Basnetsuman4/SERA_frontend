import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useToken } from "../../apis";

export function ImageComponent() {
  const { tokenInstance } = useToken();
  const { state } = useLocation();
  const [voucher_id, setVoucher] = useState(null);
  const [postResult, setPostResult] = useState("");

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
          <div>
            <img
              className="small"
              src={state.detail.image}
              alt="no image"
              //   style={{ height: 800, width: 800 }}
            />
          </div>
          <div>
            <h4> Amount: {state.detail.amount}</h4>
            <h4> Semester: {state.detail.semester}</h4>
            <button
              onClick={() => {
                handleVerify(true);
                showResultPopup();
              }}
            >
              Accept
            </button>
            <button
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
      <div id="popup">
        <div id="test1" onClick={showResultPopup} className="close">
          +
        </div>
        {postResult && (
          <div role="alert">
            <pre>{postResult}</pre>
          </div>
        )}

        <button id="test1" onClick={showResultPopup}>
          Close
        </button>
      </div>
    </>
  );
}
