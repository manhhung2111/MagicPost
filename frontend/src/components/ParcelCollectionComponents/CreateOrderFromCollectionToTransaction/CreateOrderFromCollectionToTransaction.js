import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import "./CreateOrderFromCollectionToTransaction.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  handleGetNearbyTransactionHubs,
  handleGetTransferTransactionOrders,
  handleTransferOrdersToTransactionHub,
} from "../../../services/collectionServices";

function CreateOrderFromCollectionToTransaction() {
  const [destination, setDestination] = useState(null);
  const [parcelIds, setParcelIds] = useState([]);
  const [parcelIdsOptions, setParcelIdsOptions] = useState([]);
  const [destOptions, setDestOptions] = useState([]);

  const fetchData = async () => {
    const transactionHubs = await handleGetNearbyTransactionHubs();
    if (transactionHubs?.errorCode === 0) {
      const newOptions = transactionHubs.data?.map((hub) => {
        return {
          value: hub,
          label: hub,
        };
      });
      setDestOptions((prev) => newOptions);
    }
    const fetchParcelIds = await handleGetTransferTransactionOrders();
    if (fetchParcelIds?.errorCode === 0) {
      const newOptions = fetchParcelIds.data?.map((parcel) => {
        return {
          value: parcel,
          label: parcel.id,
        };
      });
      setParcelIdsOptions((prev) => newOptions);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validate = () => {
    if (parcelIds.length === 0 || !destination) {
      toast.warn("Transfer parcelIds and destination transaction hub must not be empty!");
      return false;
    }
    const isOneHub = parcelIds.every(
      (parcel) => parcel.nextCenter === destination.value
    );
    if (!isOneHub) {
      toast.warn(
        "All transfered parcel must transfer to their expected next transaction hub"
      );
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validate()) return;
    const result = await handleTransferOrdersToTransactionHub(
      parcelIds.map((parcel) => parcel.id)
    );
    if (result?.errorCode === 0) {
      toast.success("Transfer parcels successfully");
      setDestination(null);
      setParcelIds([]);
    }
  };
  return (
    <Container className="create-order-from-collection-to-transaction">
      <div className="top">
        <h2>Transfer order(s) to transaction hub</h2>
        <Select
          defaultValue={parcelIds}
          isMulti
          options={parcelIdsOptions}
          className="multi-select"
          value={parcelIds}
          onChange={setParcelIds}
          placeholder={"Select/search parcel ids"}
          isClearable={true}
        />
        <h3>Select the transfer hub</h3>
        <Row className="g-2 mt-2 custom-row">
          <Col xs={4}>
            <Select
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
          <Col xs={7}>
            <Select
              options={destOptions}
              onChange={setDestination}
              placeholder={"Destination hub"}
              className="select"
              value={destination}
              isClearable={true}
            />
          </Col>
        </Row>
      </div>
      <button className="button" onClick={() => handleSubmit()}>
        Confirm Transfer
      </button>
    </Container>
  );
}

export default CreateOrderFromCollectionToTransaction;
