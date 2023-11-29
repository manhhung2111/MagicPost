import Container from "react-bootstrap/Container";
import "./RecipientOrderTransaction.scss";
import DelvieryOrderRecipientTable from "./DelvieryOrderRecipientTable";
import Select from "react-select";
function RecipientOrderTransaction() {
  const orders = [
    {
      parcelId: "MPN0WBQ9JJoHN",
      address: "Long canh 86, Vinhomes Thang Long",
      district: "Hoai Duc",
    },
    {
      parcelId: "MPN0WBQ9JJoHN",
      address: "Long canh 86, Vinhomes Thang Long",
      district: "Hoai Duc",
    },
    {
      parcelId: "MPN0WBQ9JJoHN",
      address: "Long canh 86, Vinhomes Thang Long",
      district: "Hoai Duc",
    },
    {
      parcelId: "MPN0WBQ9JJoHN",
      address: "Long canh 86, Vinhomes Thang Long",
      district: "Hoai Duc",
    },
  ];
  const collectionHubs = [
    { label: "Hoai Duc", value: "Hoai Duc" },
    { label: "Cau Giay", value: "Cau Giay" },
  ];
  const sortBy = [
    { label: "Alphabetical", value: "Alphabetical" },
    { label: "Date (asc)", value: "Date (asc)" },
    { label: "Date (desc)", value: "Date (desc)" },
  ];

  return (
    <Container className="recipient-order-transaction-delivery">
      <h2>Create recipient's delivery order</h2>
      <div className="filter">
        <div className="left-content">
          <p>Select by district</p>
          <Select
            defaultValue={[]}
            isMulti
            options={collectionHubs}
            className="multi-select"
            placeholder={"Select district"}
          />
        </div>
        <div className="right-content">
          <p>Sort by</p>
          <Select
            defaultValue={sortBy[0]}
            options={sortBy}
            className="multi-select"
            placeholder={"Sort by...."}
          />
        </div>
      </div>
      <DelvieryOrderRecipientTable orders={orders} />
    </Container>
  );
}

export default RecipientOrderTransaction;
