import Container from "react-bootstrap/Container";
import "./Pages.scss";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../components/Utils/Loader/Loader";
import { FaArrowRight, FaCheck, FaRegClock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import TrackingParcelInformation from "../components/TrackingComponents/TrackingParcelInformation";
import { handleGetParcelById } from "../services/trackingService";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [isSearching, setIsSearching] = useState("beofre");
  const [parcelInfo, setParcelInfo] = useState({});
  const [isDisableButton, setIsDisableButton] = useState(false);

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
          ...parcel.data?.packageInfo,
          paths: parcel.data.paths,
          delivered: parcel.data.delivered,
          parcelId: parcel.data.parcelId,
        }));
      }
      setIsSearching("done");
      setIsDisableButton(false);
    }, 3000);
  };

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      // setTrackingId(id);
      handleSearchParcel(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  <p>In Transit</p>
                </div>
                <div className="id">
                  <p>{`#${parcelInfo.parcelId}`}</p>
                  <p>Magic Post</p>
                </div>
                <p>
                  {parcelInfo.senderInfo.address}, Ha Noi <FaArrowRight />{" "}
                  {parcelInfo.recipientInfo.address}, Ha Noi
                </p>
                <div className="status">
                  <p>Expected Delivery</p>
                  <p>Nov 01 before 8:00 PM</p>
                </div>
              </div>
              <div className="tracking-logs">
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
            </div>
            <div className="right-content">
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
