import { useNavigate } from "react-router-dom";
import { verifyUser } from "../../services/authorizationService";
import { useEffect } from "react";

function PrivateRoute({ expectedRole, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const verify = async () => {
      const result = await verifyUser();
      if (expectedRole !== result.data) {
        navigate("/access-deny");
      }
    };
    verify();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return children;
}

export default PrivateRoute;
