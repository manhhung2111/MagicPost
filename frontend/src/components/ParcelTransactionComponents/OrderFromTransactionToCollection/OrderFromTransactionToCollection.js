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
  const [destination, setDestination] = useState(null);
  const [parcelIds, setParcelIds] = useState([]);

  const fetchData = async () => {
    const result = await handleGetAllOrdersCreatedBy();
    if (result.errorCode === 0) {
      const newOptions = result.data?.parcelIds.map((id) => {
        return {
          value: id,
          label: id,
        };
      });
      setOptions((prev) => newOptions);
      if (result.data.nextCenter) {
        setDestination({
          value: result.data.nextCenter,
          label: result.data.nextCenter,
        });
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleChangeOptions = (selectedOptions) => {
    setParcelIds(selectedOptions);
  };

  const validate = () => {
    if (parcelIds.length === 0) {
      toast.warn("At least 1 order must be transfered!");
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validate()) return;
    console.log(parcelIds);
    const data = {
      parcelIds: parcelIds.map((parcel) => {
        return parcel.value;
      }),
    };
    const result = await handleCreateOrderFromTransactionToCollection(data);
    if (result?.errorCode === 0) {
      toast.success(result.message);
      setParcelIds([]);
      fetchData();
    }
  };
  return (
    <Container className="order-from-transaction-to-collection">
      <div className="top">
        <h2>Transfer order(s) to collection hub</h2>
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
        <Row className="g-2 mt-2 custom-row">
          <Col>
            <Select
              onChange={handleChangeOptions}
              placeholder={
                JSON.parse(localStorage.getItem("account"))?.user_info
                  ?.center_name
              }
              className="select"
              value={JSON.parse(localStorage.getItem("account"))?.center_name}
              isDisabled={true}
            />
          </Col>
          To
          <Col>
            <Select
              options={[
                { label: "TK1", value: "TK1" },
                { label: "TK2", value: "TK2" },
              ]}
              onChange={(option) => setDestination(option)}
              placeholder={"Destination hub"}
              className="select"
              value={destination}
              isClearable={true}
              isDisabled={true}
            />
          </Col>
        </Row>
      </div>
      <p>
        {`${
          options.length > 0 ? "" : "Please create new order(s) to transfer"
        }`}
      </p>
      <button className="button" onClick={() => handleSubmit()}>
        Confirm Transfer
      </button>
    </Container>
  );
}

export default OrderFromTransactionToCollection;
