import Select from "react-select";
import Container from "react-bootstrap/Container";
import "./ConfirmOrderFromTransactionToCollection.scss";
import ConfirmOrderFromTractionToCollectionTable from "./ConfirmOrderFromTractionToCollectionTable";
function ConfirmOrderFromTransactionToCollection() {
  const orders = [
    { parcelId: "MPN0WBQ9JJoHN", from: "TK1", date: "21/11/2023" },
    { parcelId: "MPN0WBQ9JJoHN", from: "TK1", date: "21/11/2023" },
    { parcelId: "MPN0WBQ9JJoHN", from: "TK1", date: "21/11/2023" },
    { parcelId: "MPN0WBQ9JJoHN", from: "TK1", date: "21/11/2023" },
  ];

  const collectionHubs = [
    { label: "TK1", value: "TK1" },
    { label: "TK2", value: "TK2" },
  ];
  const sortBy = [
    { label: "Alphabetical", value: "Alphabetical" },
    { label: "Date (asc)", value: "Date (asc)" },
    { label: "Date (desc)", value: "Date (desc)" },
  ];
  return (
    <Container className="confirm-order-from-transaction-to-collection">
      <h2>Confirm orders from other transaction hub(s)</h2>
      <div className="pending-confirmation-orders">
        <div className="filter">
          <div className="left-content">
            <p>Select by collection hub</p>
            <Select
              defaultValue={[]}
              isMulti
              options={collectionHubs}
              className="multi-select"
              placeholder={"Select collection hubs"}
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
        <ConfirmOrderFromTractionToCollectionTable orders={orders} />
      </div>
    </Container>
  );
}

export default ConfirmOrderFromTransactionToCollection;
