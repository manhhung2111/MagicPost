import Container from "react-bootstrap/Container";
import "./OrderFromTransactionToCollection.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import { useEffect, useState } from "react";
import {
  handleCreateOrderFromTransactionToCollection,
  handleGetAllOrdersCreatedBy,
} from "../../../services/transactionServices";
import { toast } from "react-toastify";
function OrderFromTransactionToCollection() {
  const [options, setOptions] = useState([]);
  const [destination, setDestination] = useState({});
  const [parcelIds, setParcelIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await handleGetAllOrdersCreatedBy();
      if (result.errorCode === 0) {
        const newOptions = result.data?.map((id) => {
          return {
            value: id,
            label: id,
          };
        });
        setOptions((prev) => newOptions);
      }
    };
    fetchData();
  }, []);
  const handleChangeOptions = (selectedOptions) => {
    setParcelIds(selectedOptions);
  };

  const validate = () => {
    if (parcelIds.length === 0 || !destination) {
      toast.warn("Please fill all fields of the form");
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validate()) return;
    const order = {
      user_id: "GD1_S",
      start: {
        center_id: "GD1",
        orders: parcelIds.map((id) => id.value),
      },
      destination: {
        center_id: destination.value,
      },
    };
    const result = await handleCreateOrderFromTransactionToCollection(order);
    if (result?.errorCode === 0) {
      toast.success("Transfer parcels successfully");
      setDestination({});
      setParcelIds([]);
    }
    console.log(order);
  };
  return (
    <Container className="order-from-transaction-to-collection">
      <h2>Create order from transaction to collection hub</h2>
      <Select
        defaultValue={[]}
        isMulti
        options={options}
        className="multi-select"
        value={parcelIds}
        onChange={handleChangeOptions}
        placeholder={"Select the parcel Ids"}
      />
      <h3>Select the transfer hub</h3>
      <Row className="g-2 mt-2">
        <Col>
          <Select
            onChange={handleChangeOptions}
            placeholder={
              JSON.parse(localStorage.getItem("account")).center_name
            }
            className="select"
            value={JSON.parse(localStorage.getItem("account")).center_name}
            isDisabled={true}
          />
        </Col>
        <Col>
          <Select
            defaultValue={[]}
            options={[
              { label: "TK1", value: "TK1" },
              { label: "TK2", value: "TK2" },
            ]}
            onChange={(option) => setDestination(option)}
            placeholder={"To"}
            className="select"
            value={destination}
          />
        </Col>
      </Row>
      <button className="button" onClick={() => handleSubmit()}>
        Confirm Transfer
      </button>
    </Container>
  );
}

export default OrderFromTransactionToCollection;
