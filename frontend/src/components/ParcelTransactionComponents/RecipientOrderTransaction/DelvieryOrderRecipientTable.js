import { toast } from "react-toastify";
import { handleCreateShipmentToRecipient } from "../../../services/transactionServices";

function DelvieryOrderRecipientTable({
  orders,
  isDisableConfirm,
  setIsDisableConfirm,
  fetchData,
}) {
  const handleButtonClick = async (parcelId) => {
    setIsDisableConfirm(true);
    const result = await handleCreateShipmentToRecipient(parcelId);
    if (result?.errorCode === 0) {
      setTimeout(() => {
        toast.success(`Create shipment of order ${parcelId} successfully!`);
        setIsDisableConfirm(false);
        fetchData();
      }, 2000);
    }
  };

  return (
    <>
      <table className="delivery-to-recipient-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Parcel ID</th>
            <th>Type</th>
            <th>Recipient address</th>
            <th>Phone</th>
            <th>Pending from</th>
            <th>Service</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((parcel, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{parcel.parcelId}</td>
                <td>{`${
                  parcel.typeOfParcel.isDocument ? "Document" : "Package"
                }`}</td>
                <td className="address">{parcel.recipientAddress}</td>
                <td>{parcel.phoneNum}</td>
                <td className="amount">{`${
                  parcel.pendingFrom.split(",")[1]
                }, ${parcel.pendingFrom.split(",").pop()}`}</td>
                <td>{parcel.service || "None"}</td>
                <td>
                  <button
                    className="confirm"
                    onClick={() => handleButtonClick(parcel.parcelId)}
                    disabled={isDisableConfirm}
                  >
                    Create
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {orders?.length === 0 && (
        <div className="no-orders">No orders ready to ship</div>
      )}
    </>
  );
}

export default DelvieryOrderRecipientTable;
