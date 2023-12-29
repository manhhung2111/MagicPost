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
import Loader from "../../Utils/Loader/Loader";
function OrderFromTransactionToCollection() {
  const [options, setOptions] = useState([]);
  const [destination, setDestination] = useState(null);
  const [parcelIds, setParcelIds] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async () => {
    setIsSearching(true);
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
    setIsSearching(false);
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
  const handleRefresh = async () => {
    await fetchData();
  };
  return (
    <Container className="order-from-transaction-to-collection">
      {isSearching && <Loader />}
      {!isSearching && (
        <>
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
                  value={
                    JSON.parse(localStorage.getItem("account"))?.center_name
                  }
                  isDisabled={true}
                />
              </Col>
              To
              <Col>
                <Select
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
          <div className="button-group">
            <button className="button" onClick={() => handleSubmit()}>
              Confirm Transfer
            </button>
            <button
              className="refresh-btn"
              type="button"
              onClick={() => handleRefresh()}
            >
              <svg
                viewBox="0 0 16 16"
                className="bi bi-arrow-repeat"
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

export default OrderFromTransactionToCollection;
