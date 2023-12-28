import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./UpdateEmployeeAccountModal.scss";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FaRegCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { handleUpdateEmployee } from "../../../services/transactionManagementServices";
function UpdateEmployeeAccountModal({
  show,
  setShow,
  employeeInfo,
  fetchData,
}) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNume] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setUsername(employeeInfo?.user_name);
    setEmail(employeeInfo?.email);
    setName(employeeInfo?.name);
    setPhoneNume(employeeInfo?.phone);
    setAddress(employeeInfo?.address);
  }, [employeeInfo]);
  const resetAllInputs = () => {
    setUsername("");
    setEmail("");
    setName("");
    setPhoneNume("");
    setAddress("");
  };
  const handleClose = () => {
    resetAllInputs();
    setShow(false);
  };

  const validateInputs = () => {
    const validateEmail = (email) => {
      let regex = RegExp(
        // eslint-disable-next-line no-control-regex
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
      );
      return regex.test(email);
    };
    if (!username) {
      toast.warn("Username must not be empty");
      return false;
    }
    if (!email) {
      toast.warn("Email must not be empty");
      return false;
    }
    if (!validateEmail(email)) {
      toast.warn(
        "Invalid email address. Try some valid ones: johndoe@gmail.com"
      );
      return false;
    }
    if (!name) {
      toast.warn("Name must not be empty");
      return false;
    }
    if (!phoneNum) {
      toast.warn("Phone number must not be empty");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;
    const userInfo = {
      user_name: username,
      email,
      name,
      phone: phoneNum,
      address,
    };
    const result = await handleUpdateEmployee(userInfo);
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
        <Modal.Title>Update employee account</Modal.Title>
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
          <Col md className="input-control">
            <FloatingLabel label="Email" className="label">
              <Form.Control
                type="email"
                placeholder="name@example.com"
                className="input"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-3 mb-3">
          <Col md className="input-control">
            <FloatingLabel label="Name" className="label">
              <Form.Control
                type="text"
                placeholder="name@example.com"
                className="input"
                size="lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col md className="input-control">
            <FloatingLabel label="Phone number" className="label">
              <Form.Control
                type="text"
                placeholder="name@example.com"
                className="input"
                size="lg"
                value={phoneNum}
                onChange={(e) => setPhoneNume(e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-3 mb-3">
          <Col md className="input-control">
            <FloatingLabel label="Address" className="label">
              <Form.Control
                type="text"
                placeholder="name@example.com"
                className="input"
                size="lg"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="footer">
        <button className="button cancel" onClick={handleClose}>
          Cancel
        </button>
        <button className="button save" onClick={() => handleSubmit()}>
          <FaRegCheckCircle className="icon" />
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateEmployeeAccountModal;
