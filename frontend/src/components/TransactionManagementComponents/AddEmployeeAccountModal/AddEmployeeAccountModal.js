import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./AddEmployeeAccountModal.scss";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FaEye, FaEyeSlash, FaRegCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { handleCreateNewEmployee } from "../../../services/transactionManagementServices";
function AddEmployeeAccountModal({ show, setShow }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNume] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const resetAllInputs = () => {
    setUsername("");
    setEmail("");
    setName("");
    setPhoneNume("");
    setAddress("");
    setPassword("");
    setRePassword("");
    setPasswordVisible(false);
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
    if (!password || !rePassword) {
      toast.warn("Password must not be empty");
      return false;
    }
    if (password !== rePassword) {
      toast.warn("Password and Confirm Password must be identical");
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
      password,
    };
    const result = await handleCreateNewEmployee(userInfo);
    if (result?.errorCode === 0) {
      toast.success("Create new employee successfully");
      handleClose();
    } else {
      toast.warn("Username is existed. Please try another username");
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
        <Modal.Title>Add an employee account</Modal.Title>
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
        <Row className="g-3 mb-3">
          <Col md className="input-control">
            <FloatingLabel label="Password" className="label">
              <Form.Control
                type={isPasswordVisible ? "text" : "password"}
                placeholder="name@example.com"
                className="input"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length > 0 && isPasswordVisible && (
                <FaEye
                  className="icon"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                />
              )}
              {password.length > 0 && !isPasswordVisible && (
                <FaEyeSlash
                  className="icon"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                />
              )}
            </FloatingLabel>
          </Col>
          <Col md className="input-control">
            <FloatingLabel label="Confirm password" className="label">
              <Form.Control
                type={isPasswordVisible ? "text" : "password"}
                placeholder="name@example.com"
                className="input"
                size="lg"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
              {rePassword.length > 0 && isPasswordVisible && (
                <FaEye
                  className="icon"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                />
              )}
              {rePassword.length > 0 && !isPasswordVisible && (
                <FaEyeSlash
                  className="icon"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                />
              )}
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

export default AddEmployeeAccountModal;
