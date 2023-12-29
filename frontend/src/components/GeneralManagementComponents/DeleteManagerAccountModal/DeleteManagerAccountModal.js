import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./DeleteManagerAccountModal.scss";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import { handleDeleteEmployee } from "../../../services/collectionManagementServices";
import { FaRegTrashAlt } from "react-icons/fa";
function DeleteManagerAccountModal({
  show,
  setShow,
  user_name,
  fetchData
}) {
  const [username, setUsername] = useState(user_name);

  useEffect(() => {
    setUsername(user_name);
  }, [user_name]);
  const resetAllInputs = () => {
    setUsername("");

  };
  const handleClose = () => {
    resetAllInputs();
    setShow(false);
  };


  const handleSubmit = async () => {
    const result = await handleDeleteEmployee(user_name);
    if (result?.errorCode === 0) {
      toast.success(result.message);
      fetchData();
      handleClose();
    }
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
      className="add-employee-account-modal"
      size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete employee account</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body">
        <Row className="g-3 mb-3">
          <Col md className="input-control">
            <FloatingLabel label="Username" className="label">
              <Form.Control
                type="text"
                placeholder="name@example.com"
                className="input"
                size="lg"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={true}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <p>This action can not be undone!</p>
      </Modal.Body>
      <Modal.Footer className="footer">
        <button className="button cancel" onClick={handleClose}>
          Cancel
        </button>
        <button className="button delete" onClick={() => handleSubmit()}>
          <FaRegTrashAlt className="icon" />
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteManagerAccountModal;
