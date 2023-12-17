import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./AccountInfo.scss";
import { useEffect, useState } from "react";

function AccountInfo({ showModal, setShowModal }) {
  const [info, setInfo] = useState({});
  useEffect(() => {
    let isLogin = JSON.parse(localStorage.getItem("account"))?.isAuthenticated;
    if (!isLogin) return;
    const { center_name, email, name, role_name } = JSON.parse(
      localStorage.getItem("account")
    ).user_info;
    setInfo((prev) => ({ center_name, email, name, role_name }));
  }, []);
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      className="account-info-container"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="title">Account Information</Modal.Title>
      </Modal.Header>
      <Modal.Body className="account-body">
        <p>
          <b>Name:</b> {info.name}
        </p>
        <p>
          <b>Email:</b> {info.email}
        </p>
        <p>
          <b>Center name:</b> {info.center_name}
        </p>
        <p>
          <b>Role:</b> {info.role_name}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AccountInfo;
