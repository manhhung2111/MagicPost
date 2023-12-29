import Container from "react-bootstrap/Container";
import "./Pages.scss";
import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../components/Utils/Loader/Loader";
import { FaArrowRight, FaCheck, FaRegClock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import TrackingParcelInformation from "../components/TrackingComponents/TrackingParcelInformation";
import { handleGetParcelById } from "../services/trackingService";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [isSearching, setIsSearching] = useState("beofre");
  const [parcelInfo, setParcelInfo] = useState({});
  const [isDisableButton, setIsDisableButton] = useState(false);
  const pdfRef = useRef();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSearchParcel = async (id) => {
    setIsSearching("searching");
    setIsDisableButton(true);
    setParcelInfo((prev) => ({}));
    const parcel = await handleGetParcelById(id);
    navigate(`?id=${id}`);
    setTimeout(() => {
      if (parcel.errorCode === 1) {
        toast.warn(`${parcel.message}. Please try again!`);
      } else {
        toast.success("Your parcel is found successfuly!");
        setParcelInfo((prev) => ({
          ...parcel.data?.parcel.packageInfo,
          paths: parcel.data.parcel.paths,
          delivered: parcel.data.parcel.delivered,
          parcelId: parcel.data.parcel.parcelId,
          centers: parcel.data?.centers
        }));
      }
      setIsSearching("done");
      setTrackingId("");
      setIsDisableButton(false);
    }, 3000);
  };

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      handleSearchParcel(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 32;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`TrackingOrder_${parcelInfo.parcelId}.pdf`);
    });
  };
  return (
    <Container className="tracking-page">
      <h1>Magic Post Parcel Tracking</h1>
      <p>Enter your tracking number and see details about your parcel</p>
      <div className="search">
        <div className="input-group">
          <BiSearch className="icon" />
          <input
            type="text"
            className="input"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Parcel Tracking Id"
          />
        </div>
        <button
          className="button"
          onClick={() => handleSearchParcel(trackingId)}
          disabled={isDisableButton}
        >
          {" "}
          Search{" "}
        </button>
      </div>
      <Container>
        {isSearching === "searching" && <Loader />}
        {isSearching === "done" && Object.keys(parcelInfo).length !== 0 && (
          <Container className="tracking-history">
            <div className="left-content">
              <h2>Tracking history</h2>
              <div className="parcel-quick-info">
                <div className="header">
                  <h3>
                    {parcelInfo.typeOfParcel.isDocument
                      ? "Document"
                      : "Package"}
                  </h3>
                  <p className={parcelInfo.delivered ? "delivered" : "transit"}>
                    {parcelInfo.delivered ? "Delivered" : "In Transit"}
                  </p>
                </div>
                <div className="id">
                  <p>{`#${parcelInfo.parcelId}`}</p>
                  <p>Magic Post</p>
                </div>
                <p>
                  {parcelInfo.centers[0]} <FaArrowRight />{" "}
                  {parcelInfo.centers.pop()}
                </p>
                <div className="status">
                  <p>
                    {parcelInfo.delivered
                      ? "Delivered at"
                      : "Expected delivery"}
                  </p>
                  <p>Nov 01 before 8:00 PM</p>
                </div>
              </div>
              <div className="tracking-logs">
                {parcelInfo.paths?.map((path, index) => 
                  (path.isConfirmed && <div className="tracking-log">
                  <FaCheck className="icon" />
                  <h3>{`${index === 0? "Created at " : "Arrived at "} ${path.center_code}`}</h3>
                  <p>{parcelInfo.centers[index]}</p>
                  <p>
                    <FaRegClock /> {path?.time?.timeArrived}
                  </p>
                </div>)
                )}
                <div className="tracking-log">
                  <FaCheck className="icon" />
                  <h3>Arrived At Post Office</h3>
                  <p>Cau Giay, Ha Noi</p>
                  <p>
                    <FaRegClock /> 4:35 PM, Oct 21, 2023
                  </p>
                </div>
                <div className="tracking-log">
                  <FaCheck className="icon" />
                  <h3>On The Way To Post Office</h3>
                  <p>Ha Dong, Ha Noi</p>
                  <p>
                    <FaRegClock /> 9:21 PM, Oct 18, 2023
                  </p>
                </div>
                <div className="tracking-log">
                  <FaCheck className="icon" />
                  <h3>Arrived At Ha Dong Hub</h3>
                  <p>Ha Dong, Ha Noi</p>
                  <p>
                    <FaRegClock /> 6:09 AM, Oct 13, 2023
                  </p>
                </div>
              </div>
              <div
                style={{
                  height: "auto",
                  margin: "2rem auto 0",
                  maxWidth: 128,
                  width: "100%",
                }}
              >
                <QRCode
                  size={512}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={`http://localhost:3000/tracking?parcelId=${parcelInfo.parcelId}`}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <button
                className="button"
                type="button"
                onClick={() => downloadPdf()}
              >
                <span className="button__text">Download</span>
                <span className="button__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 35 35"
                    id="bdd05811-e15d-428c-bb53-8661459f9307"
                    data-name="Layer 2"
                    className="svg"
                  >
                    <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
                    <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
                    <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
                  </svg>
                </span>
              </button>
            </div>
            <div className="right-content" ref={pdfRef}>
              <TrackingParcelInformation
                typeOfParcel={parcelInfo.typeOfParcel}
                senderInfo={parcelInfo.senderInfo}
                recipientFare={[
                  { title: "COD", value: parcelInfo.recipientFare.cod },
                  {
                    title: "Another fare",
                    value: parcelInfo.recipientFare.another,
                  },
                  {
                    title: "Total",
                    value:
                      +parcelInfo.recipientFare.cod +
                      +parcelInfo.recipientFare.another,
                  },
                ]}
                recipientInfo={parcelInfo.recipientInfo}
                notes={parcelInfo.notes}
                additionalService={parcelInfo.additionalService}
                parcelValues={parcelInfo.parcelContentValue}
                weight={[
                  { title: "Actual weight:", value: parcelInfo.weight.actual },
                  {
                    title: "Converted weight:",
                    value: parcelInfo.weight.converted,
                  },
                ]}
                deliveryFare={[
                  {
                    index: "a",
                    title: "Primary Fare: ",
                    value: parcelInfo.deliveryFare.primary,
                  },
                  {
                    index: "b",
                    title: "Subordinated Fare: ",
                    value: parcelInfo.deliveryFare.subordinated,
                  },
                  {
                    index: "c",
                    title: "VAT:",
                    value: parcelInfo.deliveryFare.vat,
                  },
                  {
                    index: "d",
                    title: "Total Fare (VAT included):",
                    value:
                      +parcelInfo.deliveryFare.primary +
                      +parcelInfo.deliveryFare.subordinated +
                      +parcelInfo.deliveryFare.vat,
                  },
                  {
                    index: "e",
                    title: "Another Fare: ",
                    value: parcelInfo.deliveryFare.another,
                  },
                  {
                    index: "f",
                    title: "Total",
                    value:
                      +parcelInfo.deliveryFare.primary +
                      +parcelInfo.deliveryFare.subordinated +
                      +parcelInfo.deliveryFare.vat +
                      +parcelInfo.deliveryFare.another,
                  },
                ]}
                senderInstruction={parcelInfo.sender_instruction}
                parcelId={parcelInfo.parcelId}
                paths={parcelInfo.paths}
                delivered={parcelInfo.delivered}
              />
            </div>
          </Container>
        )}
      </Container>
    </Container>
  );
}

export default TrackingPage;
