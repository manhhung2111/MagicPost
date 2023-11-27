import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./LoginModal.scss";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleLogin } from "../../../services/authorizationService";
function LoginModal({ showLoginModal, setShowLoginModal, setIsAuthenticated }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisableButton, setIsDisableButton] = useState(false);
  const navigate = useNavigate();
  const validateInputs = () => {
    if (!userName) {
      toast.error("User name must be filled");
      return false;
    }
    if (!password) {
      toast.error("Password must be filled");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;
    setIsDisableButton(true);
    const result = await handleLogin(userName, password);
    setIsLoading(true);
    setTimeout(() => {
      if (result.errorCode === 1) {
        toast.warn("Username or password is wrong. Please try again");
      } else if (result.errorCode === 0) {
        localStorage.setItem(
          "account",
          JSON.stringify({ ...result.data, isAuthenticated: true })
        );
        setShowLoginModal(false);
        setUserName("");
        setPassword("");
        setIsAuthenticated(true);
        toast.success("Login successfully");
        navigate("/");
      }
      setIsLoading(false);
      setIsDisableButton(false);
    }, 3000);
  };
  return (
    <>
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        className="login-modal-container"
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="heading">Login form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form">
            <div className="input">
              <input
                type="text"
                className="input-field"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoFocus
              />
              <label className="input-label">Username</label>
            </div>
            <div className="input">
              <input
                type="password"
                className="input-field"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="input-label">Password</label>
            </div>
            <div className="login-submit">
              <button onClick={() => handleSubmit()} disabled={isDisableButton}>
                Log in
              </button>
              {isLoading && <div class="loader"></div>}
            </div>
          </div>
          <div className="card-info">
            <p>
              By logging in you are agreeing to our <b>Terms and Conditions</b>
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;
