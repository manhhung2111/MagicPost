import Container from "react-bootstrap/Container";
import "./Pages.scss";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../components/Utils/Loader/Loader";
import { FaArrowRight, FaCheck, FaRegClock } from "react-icons/fa6";
import ParcelValueTable from "../components/TrackingComponents/ParcelValueTable";
import approvedImg from "../assets/approved.png";
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
              <h2>Parcel Information</h2>
              <div className="boxes">
                <div className="box">
                  <div className="header">
                    <p>
                      <b>1. Sender's name and address</b>
                    </p>
                    <p>
                      Hoang Manh Hung. Long Canh 86, Vinhomes Thang Long, An
                      Khanh, Hoai Duc, Ha Noi
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Phone number:</b> 0123-456-789
                    </p>
                    <div className="code">
                      <p>
                        <b>Customer Id:</b> 21020518
                      </p>
                      <p>
                        <b>Postal Code:</b> 1000
                      </p>
                    </div>
                  </div>
                </div>
                <div className="box">
                  <div className="header">
                    <p>
                      <b>2. Recipient's name and address</b>
                    </p>
                    <p>
                      Hoang Manh Hung. Long Canh 86, Vinhomes Thang Long, An
                      Khanh, Hoai Duc, Ha Noi
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Parcel Id:</b> #RH808426989CN
                    </p>
                    <div className="code">
                      <p>
                        <b>Phone Number:</b> 0123-456-789
                      </p>
                      <p>
                        <b>Postal Code:</b> 1000
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
                          <input type="checkbox" className="input" checked disabled/>
                          <span className="custom-checkbox"></span>
                          Document
                        </label>
                        <label className="checkBox">
                          <input type="checkbox" className="input" disabled/>
                          <span className="custom-checkbox"></span>
                          Package
                        </label>
                      </div>
                    </div>
                    <div className="parcel-value">
                      <p>
                        <b>4. Parcel value content</b>
                      </p>
                      <ParcelValueTable />
                    </div>
                    <div className="parcel-service">
                      <p>
                        <b>5. Additional / Special services</b>
                      </p>
                      <p>
                        ..........................................................................................................................
                      </p>
                      <p>
                        ..........................................................................................................................
                      </p>
                      <p style={{ fontSize: "1.2rem" }}>
                        Contact Code: EMSC/PPA
                      </p>
                    </div>
                  </div>
                  <div className="sender-instruction">
                    <p>
                      <b>6. Sender's instructions for undeliverable parcel</b>
                    </p>
                    <div className="check-box-group">
                      <label className="checkBox">
                        <input type="checkbox" className="input" checked disabled/>
                        <span className="custom-checkbox"></span>
                        Return immediately
                      </label>
                      <label className="checkBox">
                        <input type="checkbox" className="input" disabled/>
                        <span className="custom-checkbox"></span>
                        Call the recipient
                      </label>
                      <label className="checkBox">
                        <input type="checkbox" className="input" disabled/>
                        <span className="custom-checkbox"></span>
                        Cancel
                      </label>
                    </div>
                    <div className="check-box-group">
                      <label className="checkBox">
                        <input type="checkbox" className="input" disabled/>
                        <span className="custom-checkbox"></span>
                        Return before Sep 6th
                      </label>
                      <label className="checkBox">
                        <input type="checkbox" className="input" checked disabled/>
                        <span className="custom-checkbox"></span>
                        Return at the end of storage period
                      </label>
                    </div>
                  </div>
                  <div className="section">
                    <div className="sender-commiment">
                      <p>
                        <b>7. Sender's commiment</b>
                      </p>
                      <p>
                        I hereby acknowledge and accept the terms specified on
                        the reverse side of the delivery slip. I affirm that the
                        contents of this parcel comply with all safety
                        regulations, and no prohibited items are enclosed.
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
                        <p>6:09 PM, 21/11/2023</p>
                      </div>
                      <div className="signature">
                        <p>
                          <b>Sender's signature</b>
                        </p>
                        <p>
                          <i>mhung</i>
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
                        {deliveryFare.map((fare) => {
                          return (
                            <div className="fare">
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
                        {recipientFare.map((fare) => {
                          return (
                            <div className="fare">
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
                        {parcelWeight.map((weight) => {
                          return (
                            <div className="weight">
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
                      </div>
                    </div>
                  </div>
                  <div className="section">
                    <div className="parcel-approval">
                      <p>
                        <b>13. Post office approval</b>
                      </p>
                      <p>Receiving clerk's signature</p>
                      <img
                        src={approvedImg}
                        alt="post office aproval"
                        width="70px"
                      />
                      <p>
                        <i>Phan Anh Duc</i>
                      </p>
                    </div>
                    <div className="delivery-date">
                      <p>
                        <b>14. Received date</b>
                      </p>
                      <p>21:11, Nov 21, 2023</p>
                      <p>Recipient's signature</p>
                      <p>
                        <i>hmanh</i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        )}
      </Container>
    </Container>
  );
}

export default TrackingPage;
