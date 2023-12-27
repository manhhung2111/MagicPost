import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import "./CreateOrderFromCollectionToCollection.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  handleGetNearbyCollectionHubs,
  handleGetTransferCollectionOrders,
  handleTransferOrdersToCollectionHub,
} from "../../../services/collectionServices";
import Loader from "../../Utils/Loader/Loader";

function CreateOrderFromCollectionToCollection() {
  const [destination, setDestination] = useState(null);
  const [parcelIds, setParcelIds] = useState([]);
  const [parcelIdsOptions, setParcelIdsOptions] = useState([]);
  const [destOptions, setDestOptions] = useState([]);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    const transactionHubs = await handleGetNearbyCollectionHubs();
    if (transactionHubs?.errorCode === 0) {
      const newOptions = transactionHubs.data?.map((hub) => {
        return {
          value: hub,
          label: hub,
        };
      });
      setDestOptions((prev) => newOptions);
    }
    const fetchParcelIds = await handleGetTransferCollectionOrders();
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

  useEffect(() => {
    if (parcelIds.length === 0) {
      setMessage("");
      return;
    }

    if (!destination) {
      const expectedCenter = parcelIds[0].value.nextCenter;
      for (let index = 1; index < parcelIds.length; index++) {
        if (parcelIds[index].value.nextCenter !== expectedCenter) {
          setMessage(
            "At least one next transaction hub os selected parcels is different from the rest"
          );
          return;
        }
      }
      setMessage(`Next expected transaction hub: ${expectedCenter}`);
    } else {
      const isOneHub = parcelIds.every(
        (parcel) => parcel.value.nextCenter === destination.value
      );
      if (!isOneHub) {
        setMessage(
          "At least one next transaction hub os selected parcels is different from the rest"
        );
      } else {
        setMessage(
          `Next expected transaction hub: ${parcelIds[0].value.nextCenter}`
        );
      }
    }
  }, [destination, parcelIds]);

  const validate = () => {
    if (parcelIds.length === 0 || !destination) {
      toast.warn(
        "Transfer parcelIds and destination collection hub must not be empty!"
      );
      return false;
    }
    const isOneHub = parcelIds.every(
      (parcel) => parcel.value.nextCenter === destination.value
    );
    if (!isOneHub) {
      toast.warn(
        "All transfered parcel must transfer to their expected next collection hub"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const result = await handleTransferOrdersToCollectionHub(
      parcelIds.map((parcel) => parcel.value.id)
    );
    if (result?.errorCode === 0) {
      toast.success(result.message);
      setDestination(null);
      setParcelIds([]);
    }
  };
  const handleRefresh = async() => {
    await fetchData()
  }
  return (
    <Container className="create-order-from-collection-to-collection">
      {destOptions.length === 0 && <Loader />}
      {destOptions.length > 0 && (
        <>
          <div className="top">
            <h2>Transfer order(s) to collection hub</h2>
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
                  value={
                    JSON.parse(localStorage.getItem("account"))?.center_name
                  }
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
            <p className="message">{message}</p>
          </div>
          <div className="button-group">
            <button className="button" onClick={() => handleSubmit()}>
              Confirm Transfer
            </button>
            <button className="refresh-btn" type="button" onClick={() => handleRefresh()}>
              <svg
                viewBox="0 0 16 16"
                class="bi bi-arrow-repeat"
                fill="currentColor"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
                <path
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                  fill-rule="evenodd"
                ></path>
              </svg>
              Refresh
            </button>
          </div>
        </>
      )}
    </Container>
  );
}

export default CreateOrderFromCollectionToCollection;
