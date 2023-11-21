import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import QRCode from "react-qr-code";

function ConfirmSenderOrderTransactionModal({ parcelId, show, setShow }) {
  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      show={show}
    >
      <Modal.Header closeButton onHide={() => setShow(false)}>
        <Modal.Title id="contained-modal-title-vcenter">
          Parcel ID and Tracking QR code
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3 style={{ textAlign: "center", fontSize: "1.4rem" }}>
          Parcel ID: {parcelId}
        </h3>
        <div
          style={{
            height: "auto",
            margin: "1rem auto 0",
            maxWidth: 128,
            width: "100%",
          }}
        >
          <QRCode
            size={512}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`http://localhost:3000/tracking?parcelId=${parcelId}`}
            viewBox={`0 0 256 256`}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="dark"
          style={{ fontSize: "1.3rem", padding: "0.5rem 1.5rem" }}
          onClick={() => setShow(false)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmSenderOrderTransactionModal;
