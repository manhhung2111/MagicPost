import { toast } from "react-toastify";
import { handleConfirmOrdersFromCollectionHub } from "../../../services/transactionServices";

function CollectionToTransactionTable({
  orders,
  isDisableConfirm,
  setIsDisableConfirm,
  fetchData,
}) {
  const handleButtonClick = async (parcelId) => {
    setIsDisableConfirm(true);
    const result = await handleConfirmOrdersFromCollectionHub(parcelId);
    if (result?.errorCode === 0) {
      setTimeout(() => {
        toast.success(`Confirm order ${parcelId} successfully!`);
        setIsDisableConfirm(false);
        fetchData();
      }, 2000);
    }
  };
  return (
    <>
      <table className="collection-to-transaction-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Parcel ID</th>
            <th>Type</th>
            <th>From</th>
            <th>Pending From</th>
            <th>Notes</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders?.length > 0 &&
            orders?.map((parcel, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{parcel.parcelId}</td>
                  <td>{`${
                    parcel.typeOfParcel.isDocument ? "Document" : "Package"
                  }`}</td>
                  <td>{parcel.sourceCenter}</td>
                  <td className="amount">{`${
                    parcel.pendingFrom.split(",")[1]
                  }, ${parcel.pendingFrom.split(",").pop()}`}</td>
                  <td className="notes">{parcel.notes}</td>
                  <td>
                    <p className="status status-pending">Pending</p>
                  </td>
                  <td>
                    <button
                      className="confirm"
                      onClick={() => handleButtonClick(parcel.parcelId)}
                      disabled={isDisableConfirm}
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {orders?.length === 0 && (
        <div className="no-orders">No orders from collection hub</div>
      )}
    </>
  );
}

export default CollectionToTransactionTable;
