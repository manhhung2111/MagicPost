import TrackingParcelValueTable from "./TrackingParcelValueTable";
import approvedImg from "../../assets/approved.png";
import QRCode from "react-qr-code";

function TrackingParcelInformation({
  senderInfo,
  recipientInfo,
  typeOfParcel,
  parcelValues,
  additionalService,
  senderInstruction,
  notes,
  deliveryFare,
  weight,
  recipientFare,
  parcelId,
  paths,
  delivered,
}) {
  return (
    <div className="parcel-information">
      <h2>Parcel Information</h2>

      <div className="boxes">
        <div className="box">
          <div className="header">
            <p>
              <b>1. Sender's name and address</b>
            </p>
            <p>{senderInfo.nameAddress}</p>
          </div>
          <div>
            <p>
              <b>Phone number:</b> {senderInfo.phoneNum}
            </p>
            <div className="code">
              <p>
                <b>Customer Id:</b> {senderInfo.customerId}
              </p>
              <p>
                <b>Postal Code:</b> {senderInfo.postalCode ?? "1000"}
              </p>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="header">
            <p>
              <b>2. Recipient's name and address</b>
            </p>
            <p>{recipientInfo.nameAddress}</p>
          </div>
          <div>
            <p>
              <b>Parcel Id:</b> #{parcelId}
            </p>
            <div className="code">
              <p>
                <b>Phone Number:</b> {recipientInfo.phoneNum}
              </p>
              <p>
                <b>Postal Code:</b> {recipientInfo.postalCode ?? "1000"}
              </p>
            </div>
          </div>
        </div>
        <div className="box-3">
          <div className="section">
            <div className="parcel-type">
              <p>
                <b>3. Type of parcel</b>
              </p>

              <div className="check-box-group">
                <label className="checkBox">
                  <input
                    type="checkbox"
                    className="input"
                    checked={typeOfParcel.isDocument}
                    disabled
                  />
                  <span className="custom-checkbox"></span>
                  Document
                </label>
                <label className="checkBox">
                  <input
                    type="checkbox"
                    className="input"
                    checked={!typeOfParcel.isDocument}
                    disabled
                  />
                  <span className="custom-checkbox"></span>
                  Package
                </label>
              </div>
            </div>
            <div className="parcel-value">
              <p>
                <b>4. Parcel value content</b>
              </p>
              <TrackingParcelValueTable parcelValues={parcelValues} />
            </div>
            <div className="parcel-service">
              <p>
                <b>5. Additional / Special services</b>
              </p>
              <p style={{ margin: "0", fontSize: "1.2rem" }}>
                {additionalService}
              </p>
              {/* <p style={{ fontSize: "1.2rem" }}>Contact Code: EMSC/PPA</p> */}
            </div>
          </div>
          <div className="sender-instruction">
            <p>
              <b>6. Sender's instructions for undeliverable parcel</b>
            </p>
            <div className="check-box-group">
              <label className="checkBox">
                <input
                  type="checkbox"
                  className="input"
                  checked={senderInstruction.returnImmediately}
                  disabled
                />
                <span className="custom-checkbox"></span>
                Return immediately
              </label>
              <label className="checkBox">
                <input
                  type="checkbox"
                  className="input"
                  checked={senderInstruction.callRecipient}
                  disabled
                />
                <span className="custom-checkbox"></span>
                Call the recipient
              </label>
              <label className="checkBox">
                <input
                  type="checkbox"
                  className="input"
                  checked={senderInstruction.cancel}
                  disabled
                />
                <span className="custom-checkbox"></span>
                Cancel
              </label>
            </div>
            <div className="check-box-group">
              <label className="checkBox">
                <input
                  type="checkbox"
                  className="input"
                  checked={senderInstruction.returnBefore}
                  disabled
                />
                <span className="custom-checkbox"></span>
                Return before Sep 6th
              </label>
              <label className="checkBox">
                <input
                  type="checkbox"
                  className="input"
                  checked={senderInstruction.returnAfterStorage}
                  disabled
                />
                <span className="custom-checkbox"></span>
                Return end of storage period
              </label>
            </div>
          </div>
          <div className="section">
            <div className="sender-commiment">
              <p>
                <b>7. Sender's commiment</b>
              </p>
              <p>
                I hereby acknowledge and accept the terms specified on the
                reverse side of the delivery slip. I affirm that the contents of
                this parcel comply with all safety regulations, and no
                prohibited items are enclosed.
                {/* In the event that delivery is unsuccessful, kindly refer to
            the guidelines outlined in section 6, and I commit to
            covering any associated shipping fees. */}
              </p>
            </div>
            <div className="sender-signature">
              <div className="date">
                <p>
                  <b>8. Date of Sending</b>
                </p>
                <p>{paths[0].time.timeArrived}</p>
              </div>
              <div className="signature">
                <p>
                  <b>Sender's signature</b>
                </p>
                <p>
                  <i>
                    {senderInfo.nameAddress
                      ?.split(".")[0]
                      .replace(/\s+/g, "")
                      .toLowerCase()}
                  </i>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="box-4">
          <div className="section">
            <div className="left">
              <div className="delivery-fare">
                <p>
                  <b>9. Delivery fare:</b>
                </p>
                {deliveryFare.map((fare, index) => {
                  return (
                    <div className="fare" key={index}>
                      <p>
                        {fare.index}. {fare.title}
                      </p>
                      <p>{fare.value}</p>
                    </div>
                  );
                })}
              </div>
              <div className="recipient-fare">
                <p>
                  <b>11. Recipient's fare:</b>
                </p>
                {recipientFare.map((fare, index) => {
                  return (
                    <div className="fare" key={index}>
                      <p>{fare.title}</p>
                      <p>{fare.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="right">
              <div className="parcel-weight">
                <p>
                  <b>10. Weight (kg):</b>
                </p>
                {weight.map((weight, index) => {
                  return (
                    <div className="weight" key={index}>
                      <p>{weight.title}</p>
                      <p>{weight.value}</p>
                    </div>
                  );
                })}
              </div>
              <div className="parcel-note">
                <p>
                  <b>12. Notes</b>
                </p>
                <p>{notes}</p>
              </div>
            </div>
          </div>
          <div className="section-2">
            <div className="parcel-approval">
              <p>
                <b>13. Post office approval</b>
              </p>
              <p>Receiving clerk's signature</p>
              <img src={approvedImg} alt="post office aproval" width="110px" />
              <p>
                <i>{paths[0]?.user_name}</i>
              </p>
            </div>
            <div className="delivery-date">
              <p>
                <b>14. Received date</b>
              </p>
              <p>{`${
                delivered ? paths?.pop()?.time?.timeDeparted ?? "Delivered" : "Not delivered"
              }`}</p>
              <p style={{ fontSize: "1.1rem" }}>Recipient's signature</p>
              {delivered && (
                <p>
                  <i>
                    {recipientInfo.nameAddress
                      ?.split(".")[0]
                      .replace(/\s+/g, "")
                      .toLowerCase()}
                  </i>
                </p>
              )}
              <div className="qr-code">
                <QRCode
                  size={64}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={`http://localhost:3000/tracking?parcelId=${parcelId}`}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackingParcelInformation;
