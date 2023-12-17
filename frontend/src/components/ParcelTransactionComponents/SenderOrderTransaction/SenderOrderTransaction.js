import Container from "react-bootstrap/Container";
import "./SenderOrderTransaction.scss";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ParcelValueContentTableTransaction from "./ParcelValueContentTableTransaction";
import { useEffect, useState } from "react";
import _ from "lodash";
import ShortUniqueId from "short-unique-id";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import {
  handleCreateSenderOrder,
  handleGetAllDistricts,
} from "../../../services/transactionServices";
import ConfirmSenderOrderTransactionModal from "./ConfirmSenderOrderTransactionModal";
import Loader from "../../Utils/Loader/Loader";

function SenderOrderTransaction({ show, setShow }) {
  const initialParcelContentValue = {
    isSelected: false,
    content: "",
    quantity: "0",
    value: "0",
    attachment: "",
  };

  const [parcelContentValues, setParcelContentValues] = useState([
    initialParcelContentValue,
  ]);
  const [isDeletedRows, setIsDeletedRows] = useState(false);
  const [senderInfo, setSenderInfo] = useState({
    nameAddress: "",
    phoneNum: "",
    customerID: "None",
    address: "",
  });
  const [recipientInfo, setRecipientInfo] = useState({
    nameAddress: "",
    phoneNum: "",
    parcelId: "",
    address: "",
  });

  const [isDocument, setIsDocument] = useState(true);
  const [additionalService, setAdditionalService] = useState("");
  const [senderInstruction, setSenderInstruction] = useState({
    returnImmediately: false,
    callRecipient: false,
    cancel: false,
    returnBefore: false,
    returnAfterStorage: false,
  });
  const [notes, setNotes] = useState("");
  const [deliveryFare, setDeliveryFare] = useState({
    primary: "",
    subordinated: "",
    vat: "",
    another: "",
    total: "",
  });

  const [weight, setWeight] = useState({ actual: "", converted: "" });
  const [recipientFare, setRecipientFare] = useState({ cod: "", another: "" });
  const [allDistricts, setAllDistricts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await handleGetAllDistricts();
      if (res.errorCode === 0) {
        setAllDistricts(
          res.data.map((location) => ({
            name: location.name,
            value: `${location.full_name}`,
            full_name: `${location.full_name}, ${
              location.parent_center_name.split("_")[1]
            }`,
          }))
        );
        setSenderInfo((prev) => ({
          ...prev,
          address: res.data.filter(
            (location) =>
              location.name ===
              JSON.parse(localStorage.getItem("account"))?.user_info.center_name
          )[0].full_name,
        }));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (
      senderInfo.nameAddress &&
      senderInfo.address &&
      senderInfo.phoneNum &&
      recipientInfo.nameAddress &&
      recipientInfo.address &&
      recipientInfo.phoneNum
    ) {
      const serialNum = new ShortUniqueId({ length: 9 });
      // const city = recipientInfo.address.split(" ");
      const index = allDistricts.findIndex(
        (district) => district.value === recipientInfo.address
      );
      if (index === -1) return;
      const city = allDistricts[index].full_name.split(" ");
      const parcelId = "MP" + serialNum.rnd() + `${city[city.length - 1]}`;
      setRecipientInfo((prev) => ({ ...prev, parcelId: parcelId }));
    } else {
      setRecipientInfo((prev) => ({ ...prev, parcelId: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    senderInfo.nameAddress,
    senderInfo.address,
    senderInfo.phoneNum,
    recipientInfo.nameAddress,
    recipientInfo.address,
    recipientInfo.phoneNum,
  ]);

  useEffect(() => {
    if (
      deliveryFare.primary.length !== 0 &&
      deliveryFare.subordinated.length !== 0 &&
      deliveryFare.vat.length !== 0 &&
      deliveryFare.another.length !== 0
    ) {
      if (
        !isNaN(+deliveryFare.primary) &&
        !isNaN(+deliveryFare.subordinated) &&
        !isNaN(+deliveryFare.vat) &&
        !isNaN(+deliveryFare.another)
      ) {
        const total =
          +deliveryFare.primary +
          +deliveryFare.subordinated +
          +deliveryFare.vat +
          +deliveryFare.another;
        setDeliveryFare((prev) => ({ ...prev, total: total.toString() }));
      }
    }
  }, [
    deliveryFare.primary,
    deliveryFare.subordinated,
    deliveryFare.vat,
    deliveryFare.another,
  ]);

  const resetAllInputs = () => {
    setParcelContentValues([initialParcelContentValue]);
    setIsDeletedRows(false);
    setSenderInfo({
      nameAddress: "",
      phoneNum: "",
      customerID: "None",
      address: allDistricts[0],
    });
    localStorage.setItem("id", recipientInfo.parcelId);
    setRecipientInfo({
      nameAddress: "",
      phoneNum: "",
      address: allDistricts[0],
      parcelId: "",
    });
    setIsDocument(true);
    setAdditionalService("");
    setSenderInstruction({
      returnImmediately: false,
      callRecipient: false,
      cancel: false,
      returnBefore: false,
      returnAfterStorage: false,
    });
    setNotes("");
    setDeliveryFare({
      primary: "",
      subordinated: "",
      vat: "",
      another: "",
      total: "",
    });
    setWeight({ actual: "", converted: "" });
    setRecipientFare({ cod: "", another: "" });
  };
  const handleClose = () => {
    resetAllInputs();
    setShow(false);
  };
  const handleChangeParcelContentValues = (value, index, key) => {
    const clone = _.cloneDeep(parcelContentValues);
    clone[index][key] = value;
    const isDeleted = clone.some((row) => row.isSelected === true);
    setIsDeletedRows(isDeleted);
    setParcelContentValues((prev) => clone);
  };

  const handleRemoveRows = async () => {
    const clone = _.cloneDeep(parcelContentValues);
    const newArr = _.cloneDeep(clone.filter((row) => row.isSelected === false));

    setParcelContentValues((prev) => newArr);
    setIsDeletedRows(false);
  };

  const handleAddMoreRow = () => {
    const clone = _.cloneDeep(parcelContentValues);
    setParcelContentValues((prev) => [...clone, initialParcelContentValue]);
  };

  const handleChangeSenderInfo = (value, key) => {
    const clone = _.cloneDeep(senderInfo);
    clone[key] = value;
    setSenderInfo((prev) => clone);
  };
  const handleChangeRecipientInfo = (value, key) => {
    const clone = _.cloneDeep(recipientInfo);
    clone[key] = value;
    setRecipientInfo((prev) => clone);
  };
  const handleChangeParcelType = (value, type) => {
    if (type === "document") {
      if (!isDocument) setIsDocument(true);
    } else {
      if (isDocument) setIsDocument(false);
    }
  };
  const handleChangeSenderInstruction = (value, key) => {
    const clone = _.cloneDeep(senderInstruction);
    clone[key] = value;
    setSenderInstruction((prev) => clone);
  };
  const handleChangeDeliveryFare = (value, key) => {
    const clone = _.cloneDeep(deliveryFare);
    clone[key] = value;
    setDeliveryFare((prev) => clone);
  };
  const handleChangeWeight = (value, key) => {
    const clone = _.cloneDeep(weight);
    clone[key] = value;
    setWeight((prev) => clone);
  };
  const handleChangeRecipientFare = (value, key) => {
    const clone = _.cloneDeep(recipientFare);
    clone[key] = value;
    setRecipientFare((prev) => clone);
  };

  //Todo:
  const isAllInputsValid = () => {
    function hasTwoSentences(str) {
      // Define a regular expression pattern for two sentences separated by a dot
      const pattern = /[.!?]\s+[A-Z]/;

      // Test the string against the pattern
      return pattern.test(str);
    }
    function removeErrorClass(id) {
      const element = document.getElementById(id);
      if (element) {
        element.classList.remove("error");
      }
    }

    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      const ids = [
        "senderInfo",
        "recipientInfo",
        "contentValue",
        "deliveryFare",
        "lastSection",
      ];
      ids.forEach((el) => removeErrorClass(el));
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: "smooth" });
        element.classList.add("error");
      }
    };

    if (!hasTwoSentences(senderInfo.nameAddress)) {
      toast.error(
        "Sender's name and address must have 2 sentences and separated by a dot"
      );
      scrollToSection("senderInfo");
      return false;
    }
    if (!senderInfo.phoneNum) {
      toast.error("Sender's phone number must not be empty");
      scrollToSection("senderInfo");
      return false;
    }

    if (!hasTwoSentences(recipientInfo.nameAddress)) {
      toast.error(
        "Recipient's name and address must have 2 sentences and separated by a dot"
      );
      scrollToSection("recipientInfo");
      return false;
    }

    if (!recipientInfo.phoneNum) {
      toast.error("Recipient's phone number must not be empty");
      scrollToSection("recipientInfo");
      return false;
    }

    const isValidContentValue = parcelContentValues.every(
      (content, index) => !isNaN(content.quantity) && !isNaN(content.value)
    );

    if (!isValidContentValue) {
      toast.error(
        `Parcel content value: ${"quantity"} and ${"value"} fields must be number`
      );
      scrollToSection("contentValue");
      return false;
    }

    const isValidDeliveryFare =
      !isNaN(+deliveryFare.primary) &&
      !isNaN(+deliveryFare.subordinated) &&
      !isNaN(+deliveryFare.vat) &&
      !isNaN(+deliveryFare.another) &&
      deliveryFare.primary.length !== 0 &&
      deliveryFare.subordinated.length !== 0 &&
      deliveryFare.vat.length !== 0 &&
      deliveryFare.another.length !== 0;

    if (!isValidDeliveryFare) {
      toast.error(`Delivery fare fields must be filled and must be numbers`);
      scrollToSection("deliveryFare");
      return false;
    }

    const isValidWeight =
      !isNaN(+weight.actual) &&
      !isNaN(+weight.converted) &&
      weight.actual.length !== 0 &&
      weight.converted.length !== 0;

    if (!isValidWeight) {
      toast.error(`Parcel's weight fields must be filled and must be numbers`);
      scrollToSection("lastSection");
      return false;
    }

    const isValidRecipientFare =
      !isNaN(+recipientFare.cod) &&
      !isNaN(+recipientFare.another) &&
      recipientFare.cod.length !== 0 &&
      recipientFare.another.length !== 0;

    if (!isValidRecipientFare) {
      toast.error(`Recipient fare fields must be filled and must be numbers`);
      scrollToSection("lastSection");
      return false;
    }
    //remove error from form
    const ids = [
      "senderInfo",
      "recipientInfo",
      "contentValue",
      "deliveryFare",
      "lastSection",
    ];
    ids.forEach((el) => removeErrorClass(el));

    return true;
  };
  const handleSubmitOrder = async () => {
    if (!isAllInputsValid()) return;
    setIsDisabledButton(true);
    const { phoneNum, nameAddress, parcelId, address } = recipientInfo;
    const parcel = {
      parcelId: parcelId,
      packageInfo: {
        senderInfo: senderInfo,
        recipientInfo: {
          phoneNum,
          nameAddress,
          address,
        },
        typeOfParcel: {
          isDocument: isDocument,
        },
        additionalService: additionalService,
        sender_instruction: {
          returnImmediately: senderInstruction.returnImmediately,
          callRecipient: senderInstruction.callRecipient,
          cancel: senderInstruction.cancel,
          returnBefore: senderInstruction.returnBefore,
          returnAfterStorage: senderInstruction.returnAfterStorage,
        },
        notes: notes,
        deliveryFare: {
          primary: deliveryFare.primary,
          subordinated: deliveryFare.subordinated,
          vat: deliveryFare.vat,
          another: deliveryFare.another,
        },
        weight: {
          actual: weight.actual,
          converted: weight.converted,
        },
        recipientFare: {
          cod: recipientFare.cod,
          another: recipientFare.another,
        },
        parcelContentValue: parcelContentValues,
      },
      paths: [],
    };
    const result = await handleCreateSenderOrder(parcel);
    if (result.errorCode === 0) {
      toast.success(result.message);
      setShowModal(true);
      setShow(false);
    }
    setIsDisabledButton(false);
    resetAllInputs();
  };

  return (
    <>
      {allDistricts.length > 0 && (
        <>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            centered
            size="xl"
            className="add-sender-order-transaction-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title className="title">Create new order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container
                className="sender-order-transaction-container"
                id="sender-order-transaction"
              >
                <div className="sender-information" id="senderInfo">
                  <p>1. Sender's information</p>
                  <div className="input-group">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Sender's name and address"
                      className="input"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{
                          height: "100%",
                          resize: "none",
                          borderRadius: "5px",
                        }}
                        size="lg"
                        value={senderInfo.nameAddress}
                        onChange={(e) =>
                          handleChangeSenderInfo(e.target.value, "nameAddress")
                        }
                        autoFocus={true}
                      />
                    </FloatingLabel>
                    <div className="sender">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Sender's phone number"
                        className="input"
                      >
                        <Form.Control
                          type="text"
                          placeholder="name@example.com"
                          size="lg"
                          value={senderInfo.phoneNum}
                          onChange={(e) =>
                            handleChangeSenderInfo(e.target.value, "phoneNum")
                          }
                        />
                      </FloatingLabel>

                      <Row className="g-2">
                        <Col md>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Sender's customer Id"
                            className="input"
                            value={senderInfo.customerID}
                            onChange={(e) =>
                              handleChangeSenderInfo(
                                e.target.value,
                                "customerId"
                              )
                            }
                          >
                            <Form.Control
                              type="text"
                              placeholder="name@example.com"
                              size="lg"
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md>
                          <FloatingLabel
                            controlId="floatingSelectGrid"
                            label="Select sender's district"
                            className="input"
                          >
                            <Form.Select
                              aria-label="Floating label select example"
                              style={{ paddingBottom: "3px" }}
                              value={""}
                              onChange={(e) =>
                                handleChangeSenderInfo(
                                  e.target.value,
                                  "address"
                                )
                              }
                              disabled
                            >
                              {allDistricts.map((district, index) => {
                                return (
                                  <option
                                    value={district.value}
                                    key={index}
                                    disabled={
                                      district.name !==
                                      JSON.parse(
                                        localStorage.getItem("account")
                                      )?.user_info.center_name
                                    }
                                  >
                                    {district.full_name}
                                  </option>
                                );
                              })}
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
                <div className="sender-information" id="recipientInfo">
                  <p>2. Recipient's information</p>
                  <div className="input-group">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Recipient's name and address"
                      className="input"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{
                          height: "100%",
                          resize: "none",
                          borderRadius: "5px",
                        }}
                        size="lg"
                        value={recipientInfo.nameAddress}
                        onChange={(e) =>
                          handleChangeRecipientInfo(
                            e.target.value,
                            "nameAddress"
                          )
                        }
                      />
                    </FloatingLabel>
                    <div className="sender">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Recipient's phone number"
                        className="input"
                      >
                        <Form.Control
                          type="text"
                          placeholder="name@example.com"
                          size="lg"
                          value={recipientInfo.phoneNum}
                          onChange={(e) =>
                            handleChangeRecipientInfo(
                              e.target.value,
                              "phoneNum"
                            )
                          }
                        />
                      </FloatingLabel>

                      <Row className="g-2">
                        <Col md>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Parcel Id"
                            className="input"
                            title="Fill all sender's and recipient's information to get Parcel Id"
                          >
                            <Form.Control
                              type="text"
                              placeholder="name@example.com"
                              size="lg"
                              disabled
                              value={recipientInfo.parcelId}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col md>
                          <FloatingLabel
                            controlId="floatingSelectGrid"
                            label="Select recipient's district"
                            className="input"
                          >
                            <Form.Select
                              aria-label="Floating label select example"
                              style={{ paddingBottom: "3px" }}
                              value={recipientInfo.address}
                              onChange={(e) =>
                                handleChangeRecipientInfo(
                                  e.target.value,
                                  "address"
                                )
                              }
                            >
                              {allDistricts.map((district, index) => {
                                return (
                                  <option value={district.value} key={index}>
                                    {district.full_name}
                                  </option>
                                );
                              })}
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
                <div className="input-group" id="parcelType">
                  <div className="parcel-type">
                    <p>3. Type of parcel</p>

                    <div className="check-box-group">
                      <label className="checkBox">
                        <input
                          type="checkbox"
                          className="input"
                          checked={isDocument}
                          onChange={(e) =>
                            handleChangeParcelType(e.target.checked, "document")
                          }
                        />
                        <span className="custom-checkbox"></span>
                        Document
                      </label>
                      <label className="checkBox">
                        <input
                          type="checkbox"
                          className="input"
                          checked={!isDocument}
                          onChange={(e) =>
                            handleChangeParcelType(e.target.checked, "package")
                          }
                        />
                        <span className="custom-checkbox"></span>
                        Package
                      </label>
                    </div>
                  </div>
                  <div className="additional-service">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="5. Additional/Special services"
                      className="input"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{
                          height: "100%",
                          resize: "none",
                          borderRadius: "5px",
                        }}
                        size="lg"
                        value={additionalService}
                        onChange={(e) => setAdditionalService(e.target.value)}
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="input-group">
                  <div className="parcel-value" id="contentValue">
                    <p>4. Parcel content value</p>
                    <ParcelValueContentTableTransaction
                      parcelValues={parcelContentValues}
                      isDeletedRows={isDeletedRows}
                      handleAddMoreRow={handleAddMoreRow}
                      handleChangeParcelValues={handleChangeParcelContentValues}
                      handleRemoveRows={handleRemoveRows}
                    />
                  </div>
                  <div className="sender-instruction">
                    <p>6. Sender's instructions for undeliverable parcel</p>
                    <div className="check-box-group">
                      <label className="checkBox">
                        <input
                          type="checkbox"
                          className="input"
                          checked={senderInstruction.returnImmediately}
                          onChange={(e) =>
                            handleChangeSenderInstruction(
                              e.target.checked,
                              "returnImmediately"
                            )
                          }
                        />
                        <span className="custom-checkbox"></span>
                        Return immediately
                      </label>
                      <label className="checkBox">
                        <input
                          type="checkbox"
                          className="input"
                          checked={senderInstruction.callRecipient}
                          onChange={(e) =>
                            handleChangeSenderInstruction(
                              e.target.checked,
                              "callRecipient"
                            )
                          }
                        />
                        <span className="custom-checkbox"></span>
                        Call the recipient
                      </label>
                      <label className="checkBox">
                        <input
                          type="checkbox"
                          className="input"
                          checked={senderInstruction.cancel}
                          onChange={(e) =>
                            handleChangeSenderInstruction(
                              e.target.checked,
                              "cancel"
                            )
                          }
                        />
                        <span className="custom-checkbox"></span>
                        Cancel
                      </label>
                      <label className="checkBox">
                        <input
                          type="checkbox"
                          className="input"
                          checked={senderInstruction.returnBefore}
                          onChange={(e) =>
                            handleChangeSenderInstruction(
                              e.target.checked,
                              "returnBefore"
                            )
                          }
                        />
                        <span className="custom-checkbox"></span>
                        Return before Sep 6th
                      </label>
                      <label className="checkBox">
                        <input
                          type="checkbox"
                          className="input"
                          checked={senderInstruction.returnAfterStorage}
                          onChange={(e) =>
                            handleChangeSenderInstruction(
                              e.target.checked,
                              "returnAfterStorage"
                            )
                          }
                        />
                        <span className="custom-checkbox"></span>
                        Return at the end of storage period
                      </label>
                    </div>
                    <FloatingLabel
                      controlId="floatingTextarea"
                      label="7. Notes"
                      className="mb-2 note"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        size="lg"
                        style={{ height: "60px", resize: "none" }}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="delivery-fare" id="deliveryFare">
                  <p>8. Delivery Fare</p>
                  <div className="input-group">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Primary Fare"
                      className="input"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Leave a comment here"
                        size="lg"
                        value={deliveryFare.primary}
                        onChange={(e) =>
                          handleChangeDeliveryFare(e.target.value, "primary")
                        }
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Subordinated Fare"
                      className="input"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Leave a comment here"
                        size="lg"
                        value={deliveryFare.subordinated}
                        onChange={(e) =>
                          handleChangeDeliveryFare(
                            e.target.value,
                            "subordinated"
                          )
                        }
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="VAT"
                      className="input"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Leave a comment here"
                        size="lg"
                        value={deliveryFare.vat}
                        onChange={(e) =>
                          handleChangeDeliveryFare(e.target.value, "vat")
                        }
                      />
                    </FloatingLabel>
                  </div>
                  <div className="input-group">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Total Fare (VAT included)"
                      className="input"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Leave a comment here"
                        size="lg"
                        value={deliveryFare.total}
                        disabled
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Another Fare"
                      className="input"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Leave a comment here"
                        size="lg"
                        value={deliveryFare.another}
                        onChange={(e) =>
                          handleChangeDeliveryFare(e.target.value, "another")
                        }
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="last-section" id="lastSection">
                  <div className="weight">
                    <p>9. Weight (kg)</p>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Actual weight"
                      className="input"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Leave a comment here"
                        size="lg"
                        value={weight.actual}
                        onChange={(e) =>
                          handleChangeWeight(e.target.value, "actual")
                        }
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Converted weight"
                      className="input"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Leave a comment here"
                        size="lg"
                        value={weight.converted}
                        onChange={(e) =>
                          handleChangeWeight(e.target.value, "converted")
                        }
                      />
                    </FloatingLabel>
                  </div>
                  <div className="weight">
                    <p>10. Recipient's Fare</p>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="COD"
                      className="input"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Leave a comment here"
                        size="lg"
                        value={recipientFare.cod}
                        onChange={(e) =>
                          handleChangeRecipientFare(e.target.value, "cod")
                        }
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Another fare"
                      className="input"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Leave a comment here"
                        size="lg"
                        value={recipientFare.another}
                        onChange={(e) =>
                          handleChangeRecipientFare(e.target.value, "another")
                        }
                      />
                    </FloatingLabel>
                  </div>
                </div>
              </Container>
            </Modal.Body>
            <Modal.Footer className="footer-custom-modal">
              <button className="button cancel" onClick={handleClose}>
                Cancel
              </button>
              <button
                className="button save"
                onClick={() => handleSubmitOrder()}
                disabled={isDisabledButton}
              >
                Save changes
              </button>
            </Modal.Footer>
          </Modal>
          <ConfirmSenderOrderTransactionModal
            parcelId={localStorage.getItem("id")}
            show={showModal}
            setShow={setShowModal}
          />
        </>
      )}
      {allDistricts.length === 0 && <Loader />}
    </>
  );
}

export default SenderOrderTransaction;
