import Container from "react-bootstrap/Container";
import "./OrderFromTransactionToCollection.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import { useState } from "react";
function OrderFromTransactionToCollection() {
  const [options, setOptions] = useState([
    { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
    { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
    { value: "purple", label: "Purple", color: "#5243AA" },
    { value: "red", label: "Red", color: "#FF5630", isFixed: true },
    { value: "orange", label: "Orange", color: "#FF8B00" },
    { value: "yellow", label: "Yellow", color: "#FFC400" },
    { value: "green", label: "Green", color: "#36B37E" },
    { value: "forest", label: "Forest", color: "#00875A" },
    { value: "slate", label: "Slate", color: "#253858" },
    { value: "silver", label: "Silver", color: "#666666" },
  ]);

  const [parcelIds, setParcelIds] = useState([]);
  const handleChangeOptions = (selectedOptions) => {
    setParcelIds(selectedOptions);
  };

  return (
    <Container className="order-from-transaction-to-collection">
      <h2>Create order from transaction to collection hub</h2>
      <Select
        defaultValue={[]}
        isMulti
        options={options}
        className="multi-select"
        onChange={handleChangeOptions}
        placeholder={"Select the parcel Ids"}
      />
      {parcelIds.map((id) => {
        return <p>{id.label}</p>;
      })}
      <h3>Select the transfer hub</h3>
      <Row className="g-2 mt-2">
        <Col>
          <Select
            defaultValue={[]}
            isMulti
            options={options}
            onChange={handleChangeOptions}
            placeholder={"From"}
            className="select"
          />
        </Col>
        <Col>
          <Select
            defaultValue={[]}
            isMulti
            options={options}
            onChange={handleChangeOptions}
            placeholder={"To"}
            className="select"
          />
        </Col>
      </Row>
      <button className="button">Confirm Transfer</button>
    </Container>
  );
}

export default OrderFromTransactionToCollection;
