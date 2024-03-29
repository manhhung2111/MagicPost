import { handleConfirmOrderFromTransactionHubs } from "../../../services/collectionServices";
import { toast } from "react-toastify";

function ConfirmOrderFromCollectionToCollectionTable({
  orders,
  isDisableConfirm,
  setIsDisableConfirm,
  fetchData,
}) {
  const handleButtonClick = async (parcelId) => {
    setIsDisableConfirm(true);
    const result = await handleConfirmOrderFromTransactionHubs(parcelId);
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
      <table className="collection-to-collection-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Parcel ID</th>
            <th>Type</th>
            <th>From</th>
            <th>Pending From</th>
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
                  <td>
                    <p className="status status-pending">Pending</p>
                  </td>
                  <td>
                    <button
                      className="confirm"
                      disabled={isDisableConfirm}
                      onClick={() => handleButtonClick(parcel.parcelId)}
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
        <div className="no-orders">No orders from other collection hubs</div>
      )}
    </>
  );
}

export default ConfirmOrderFromCollectionToCollectionTable;
