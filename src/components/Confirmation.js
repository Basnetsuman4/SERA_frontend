import { useNavigate } from "react-router-dom";

export function Confirmation() {
  const navigate = useNavigate();
  return (
    <>
      <div className="msgForLogout">
        <p>Do you want to logout?</p>
        <button
          id="btn"
          style={{ border: "none", color: "white" }}

          onClick={() => {
            navigate("/logout");
          }}
        >
          Yes
        </button>
      </div>
    </>
  );
}
