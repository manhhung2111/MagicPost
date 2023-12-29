import "./RecipientShipmentConfirmation.scss";
import { toast } from "react-toastify";
import { handleConfirmRecipientShipmentStatus } from "../../../services/transactionServices";
function ShipmentStatusCard({
  shipments,
  isDisableConfirm,
  setIsDisableConfirm,
  fetchData,
}) {
  const handleButtonClick = async (parcelId, status) => {
    setIsDisableConfirm(true);
    const result = await handleConfirmRecipientShipmentStatus(parcelId, status);
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
      <div className="shipment-status-cards">
        {shipments?.length > 0 &&
          shipments?.map((shipment, index) => (
            <div className="shipment-card">
              <div className="parcel-info">
                <div className="header">
                  <h3>
                    {shipment.typeOfParcel.isDocument ? "Document" : "Package"}
                  </h3>
                  <p
                    className={
                      shipment.status === "In transit"
                        ? "transit"
                        : shipment.status === "Delivered successfully"
                        ? "delivered"
                        : "failed"
                    }
                  >
                    {shipment.status}
                  </p>
                </div>
                <div className="id">
                  <p>{`#${shipment.parcelId}`}</p>
                  <p>Magic Post</p>
                </div>
                <p>
                  <b>Recipient's info:</b> {shipment.recipientNameAddress}
                </p>
                <p>
                  <b>Pending from:</b> {shipment.pendingFrom}
                </p>
                <div className="status">
                  <p>
                    {shipment.deliveredAt
                      ? "Delivered at"
                      : "Expected delivery"}
                  </p>
                  <p>
                    {shipment.deliveredAt
                      ? shipment.deliveredAt
                      : "Nov 01 before 8:00 PM"}
                  </p>
                </div>
              </div>
              <div className="button-group">
                <button
                  className="btn btn-success"
                  disabled={
                    isDisableConfirm ||
                    shipment.status === "Delivered successfully"
                  }
                  onClick={() =>
                    handleButtonClick(
                      shipment.parcelId,
                      "Delivered successfully"
                    )
                  }
                >
                  Delivered successfully
                </button>
                <button
                  className="btn btn-fail"
                  disabled={
                    isDisableConfirm ||
                    shipment.status === "Delivered successfully"
                  }
                  onClick={() =>
                    handleButtonClick(
                      shipment.parcelId,
                      "Deliverd unsuccessfully"
                    )
                  }
                >
                  Delivered unsuccessfully
                </button>
              </div>
            </div>
          ))}
      </div>
      {shipments?.length === 0 && (
        <div className="no-orders">No satisfied shipment</div>
      )}
    </>
  );
}

export default ShipmentStatusCard;
