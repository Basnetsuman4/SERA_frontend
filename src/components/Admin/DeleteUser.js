import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToken } from "../../apis";

function DeleteUser() {
  const { tokenInstance } = useToken();
  const location = useLocation();
  const detail = location.state;
  const navigate = useNavigate();
  const [postResult, setPostResult] = useState(null);

  console.log("delete", detail);
  const toggle = () => {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  };

  const name = useRef(null);
  function handleSubmit() {
    tokenInstance
      .delete(`/delete/${detail.userName}`)
      .then((res) => {
        console.log(res);
        setPostResult(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setPostResult(err.data.response.message);
      });
  }

  return (
    <>
      <div className="contain" id="blur">
        <div className="content">
          <div className="msgForLogout">
            <p>Are you sure you want to delete this account? </p>
            <button
              onClick={() => {
                handleSubmit();
                toggle();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div id="popup">
        <div id="test1" onClick={toggle} className="close">
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
            toggle();
            navigate("/secure/search");
          }}
        >
          Close
        </button>
      </div>
    </>
  );
}
export default DeleteUser;
