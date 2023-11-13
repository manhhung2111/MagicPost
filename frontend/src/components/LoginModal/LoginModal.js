import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";

import "./LoginModal.scss";
function LoginModal({ showLoginModal, setShowLoginModal }) {
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
          <form class="form">
            <div class="input">
              <input
                type="text"
                className="input-field"
                // value="Alexander Parkinson"
                required
                autoFocus
              />
              <label className="input-label">Full name</label>
            </div>
            <div className="input">
              <input
                type="text"
                className="input-field"
                // value="vlockn@gmail.com"
                required
              />
              <label className="input-label">Email</label>
            </div>
            <div className="input">
              <input type="password" className="input-field" required />
              <label className="input-label">Password</label>
            </div>
            <div className="action">
              <button className="action-button">Get started</button>
            </div>
          </form>
          <div className="card-info">
            <p>
              By logging in you are agreeing to our{" "}
              <a href="#">Terms and Conditions</a>
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;
