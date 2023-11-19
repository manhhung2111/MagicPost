import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TrackingParcelInformation from "../../TrackingComponents/TrackingParcelInformation";

function ConfirmSenderOrderTransactionModal({
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
  show,
  setShow,
}) {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      show={show}
    >
      <Modal.Header closeButton onHide={() => setShow(false)}>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm your order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TrackingParcelInformation
          senderInfo={senderInfo}
          recipientInfo={recipientInfo}
          typeOfParcel={typeOfParcel}
          deliveryFare={deliveryFare}
          recipientFare={recipientFare}
          notes={notes}
          weight={weight}
          parcelValues={parcelValues}
          additionalService={additionalService}
          senderInstruction={senderInstruction}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmSenderOrderTransactionModal;
