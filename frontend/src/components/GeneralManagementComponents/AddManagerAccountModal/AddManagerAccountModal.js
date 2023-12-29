import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./AddManagerAccountModal.scss";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FaEye, FaEyeSlash, FaRegCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  handleCreateNewManager,
  handleGetCentersInfo,
} from "../../../services/generalManagementServices";
function AddManagerAccountModal({ show, setShow, setCardsStatistics}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNume] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [role, setRole] = useState("");
  const [center, setCenter] = useState("");
  const [centerOptions, setCenterOptions] = useState([]);

  const fetchData = async () => {
    const options = await handleGetCentersInfo();
    if (options?.errorCode === 0) {
      setCenterOptions(options.data);
      setCardsStatistics(prev => ({...prev, totalCenters: options.data?.length}))
    }
  };
  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const resetAllInputs = () => {
    setUsername("");
    setEmail("");
    setName("");
    setPhoneNume("");
    setAddress("");
    setPassword("");
    setRePassword("");
    setPasswordVisible(false);
    setRole("");
    setCenter("");
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
    if (!role) {
      toast.warn("Role must not be empty");
      return false;
    }
    if (!center) {
      toast.warn("Responsible center must not be empty");
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
      center_name: center,
      role_name: role,
    };
    const result = await handleCreateNewManager(userInfo);
    if (result?.errorCode === 0) {
      toast.success("Create new manager successfully");
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
        <Modal.Title>Add a manager account</Modal.Title>
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
            <FloatingLabel
              label="Role"
              className="label"
              onChange={(e) => setRole(e.target.value)}
            >
              <Form.Select aria-label="Floating label select example">
                <option disabled>Select role of manager</option>
                <option value="GDT">Transaction center manager</option>
                <option value="TKT">Collection center manager</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col md className="input-control">
            <FloatingLabel
              label="Center"
              className="label"
              onChange={(e) => setCenter(e.target.value)}
            >
              <Form.Select aria-label="Floating label select example">
                <option disabled>Select manager's center</option>
                {centerOptions.length > 0 &&
                  centerOptions.map((center, index) => (
                    <option value={center.center_code} key={index}>
                      {center.name}
                    </option>
                  ))}
              </Form.Select>
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

export default AddManagerAccountModal;
