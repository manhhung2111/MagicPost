import Container from "react-bootstrap/Container";
import "./Pages.scss";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../components/Utils/Loader/Loader";
import { FaArrowRight, FaCheck, FaRegClock } from "react-icons/fa6";

import TrackingParcelInformation from "../components/TrackingComponents/TrackingParcelInformation";
function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [isSearching, setIsSearching] = useState("beofre");
  const handleSearchParcel = () => {
    setIsSearching("searching");
    setTimeout(() => {
      setIsSearching("done");
    }, 3000);
  };

  const deliveryFare = [
    { index: "a", title: "Primary Fare: ", value: "9.500" },
    { index: "b", title: "Subordinated Fare: ", value: "1.900" },
    { index: "c", title: "VAT:", value: "0" },
    { index: "d", title: "Total Fare (VAT included):", value: "12.312" },
    { index: "e", title: "Another Fare: ", value: "0" },
    { index: "f", title: "Total", value: "12.312" },
  ];

  const recipientFare = [
    { title: "COD", value: 0 },
    { title: "Another fare", value: 0 },
    { title: "Total", value: 0 },
  ];

  const parcelWeight = [
    { title: "Actual weight:", value: "30" },
    { title: "Converted weight:", value: "0" },
  ];
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
        <button className="button" onClick={() => handleSearchParcel()}>
          {" "}
          Search{" "}
        </button>
      </div>
      <Container>
        {isSearching === "searching" && <Loader />}
        {isSearching === "done" && (
          <Container className="tracking-history">
            <div className="left-content">
              <h2>Tracking history</h2>
              <div className="parcel-quick-info">
                <div className="header">
                  <h3>Apple Watch</h3>
                  <p>In Transit</p>
                </div>
                <div className="id">
                  <p>#RH808426989CN</p>
                  <p>Magic Post</p>
                </div>
                <p>
                  An Khanh, Ha Noi <FaArrowRight /> Cau Giay, Ha Noi
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
              <TrackingParcelInformation />
            </div>
          </Container>
        )}
      </Container>
    </Container>
  );
}

export default TrackingPage;
