import "./AccessDeny.scss";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function AccessDeny() {
  const navigate = useNavigate();
  return (
    <div className="access-deny-container">
      <h1>
        4
        <span>
          <FaLock />
        </span>
        3
      </h1>
      <h2>Error: 403 access denied</h2>
      <p>Sorry, you don't have permission to access this page</p>
      <button
        className="button"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to home page
      </button>
    </div>
  );
}

export default AccessDeny;
