import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import "./CreateOrderFromCollectionToTransaction.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function CreateOrderFromCollectionToTransaction() {
  const [options, setOptions] = useState([]);
  const [destination, setDestination] = useState(null);
  const [parcelIds, setParcelIds] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   const result = await handleGetAllOrdersCreatedBy();
    //   if (result.errorCode === 0) {
    //     const newOptions = result.data?.map((id) => {
    //       return {
    //         value: id,
    //         label: id,
    //       };
    //     });
    //     setOptions((prev) => newOptions);
    //   }
    // };
    // fetchData();
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
    // const order = {
    //   user_id: "GD1_S",
    //   start: {
    //     center_id: "GD1",
    //     orders: parcelIds.map((id) => id.value),
    //   },
    //   destination: {
    //     center_id: destination.value,
    //   },
    // };
    // const result = await handleCreateOrderFromTransactionToCollection(order);
    // if (result?.errorCode === 0) {
    //   toast.success("Transfer parcels successfully");
    //   setDestination({});
    //   setParcelIds([]);
    // }
  };
  return (
    <Container className="create-order-from-collection-to-transaction">
      <div className="top">
        <h2>Transfer order(s) to transaction hub</h2>
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
                JSON.parse(localStorage.getItem("account")).center_name
              }
              className="select"
              value={JSON.parse(localStorage.getItem("account")).center_name}
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
