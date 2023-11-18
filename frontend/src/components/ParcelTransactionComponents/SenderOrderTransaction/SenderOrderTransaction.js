import Container from "react-bootstrap/Container";
import "./SenderOrderTransaction.scss";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import ParcelValueContentTableTransaction from "./ParcelValueContentTableTransaction";
import { useEffect, useState } from "react";
import _ from "lodash";
import ShortUniqueId from 'short-unique-id';

function SenderOrderTransaction() {
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
    customerId: "",
  });
  const [recipientInfo, setRecipientInfo] = useState({
    nameAddress: "",
    phoneNum: "",
    parcelId: "",
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
  });

  const [weight, setWeight] = useState({ actual: "", converted: "" });
  const [recipientFare, setRecipientFare] = useState({ cod: "", another: "" });

  useEffect(() => {
    if (
      senderInfo.nameAddress &&
      senderInfo.phoneNum &&
      recipientInfo.nameAddress &&
      recipientInfo.phoneNum && !recipientInfo.parcelId
    ) {
      const serialNum = new ShortUniqueId({ length: 9 });
      const parcelId = "MP" + serialNum.rnd() + "HN";
      setRecipientInfo((prev) => ({ ...prev, parcelId: parcelId }));
    }
  }, [senderInfo, recipientInfo]);
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
  const handleSubmitOrder = () => {
    console.log(
      parcelContentValues,
      senderInfo,
      recipientInfo,
      isDocument,
      additionalService,
      senderInstruction,
      notes,
      deliveryFare,
      weight,
      recipientFare
    );
  };
  return (
    <Container className="sender-order-transaction-container">
      <h2>Create new order</h2>
      <div className="sender-information">
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
              style={{ height: "100%", resize: "none", borderRadius: "5px" }}
              size="lg"
              value={senderInfo.nameAddress}
              onChange={(e) =>
                handleChangeSenderInfo(e.target.value, "nameAddress")
              }
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
            <FloatingLabel
              controlId="floatingInput"
              label="Sender's customer Id"
              className="input"
              value={senderInfo.customerId}
              onChange={(e) =>
                handleChangeSenderInfo(e.target.value, "customerId")
              }
            >
              <Form.Control
                type="text"
                placeholder="name@example.com"
                size="lg"
              />
            </FloatingLabel>
          </div>
        </div>
      </div>
      <div className="sender-information">
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
              style={{ height: "100%", resize: "none", borderRadius: "5px" }}
              size="lg"
              value={recipientInfo.nameAddress}
              onChange={(e) =>
                handleChangeRecipientInfo(e.target.value, "nameAddress")
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
                  handleChangeRecipientInfo(e.target.value, "phoneNum")
                }
              />
            </FloatingLabel>
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
          </div>
        </div>
      </div>
      <div className="input-group">
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
              style={{ height: "100%", resize: "none", borderRadius: "5px" }}
              size="lg"
              value={additionalService}
              onChange={(e) => setAdditionalService(e.target.value)}
            />
          </FloatingLabel>
        </div>
      </div>
      <div className="input-group">
        <div className="parcel-value">
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
                  handleChangeSenderInstruction(e.target.checked, "cancel")
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
      <div className="delivery-fare">
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
                handleChangeDeliveryFare(e.target.value, "subordinated")
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
              onChange={(e) => handleChangeDeliveryFare(e.target.value, "vat")}
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
      <div className="last-section">
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
              onChange={(e) => handleChangeWeight(e.target.value, "actual")}
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
              onChange={(e) => handleChangeWeight(e.target.value, "converted")}
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
              onChange={(e) => handleChangeRecipientFare(e.target.value, "cod")}
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
      <button className="submit" onClick={() => handleSubmitOrder()}>
        Create Order
      </button>
    </Container>
  );
}

export default SenderOrderTransaction;
