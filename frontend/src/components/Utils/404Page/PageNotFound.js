import "./PageNotFound.scss";
import { FaGhost } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="page-not-found-container">
      <h1>
        4
        <span>
          <FaGhost />
        </span>
        4
      </h1>
      <h2>Error: 404 page not found</h2>
      <p>Sorry, the page you're looking for cannot be accessed</p>
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

export default PageNotFound;
