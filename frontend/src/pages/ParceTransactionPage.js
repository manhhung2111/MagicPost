import Container from "react-bootstrap/Container";
import "./Pages.scss";
import { FaPlus } from "react-icons/fa6";
import homeDeliveryWorker from "../assets/loading-workman.jpg";
import { useState, useEffect } from "react";
import SenderOrderTransaction from "../components/ParcelTransactionComponents/SenderOrderTransaction/SenderOrderTransaction";
import OrderFromTransactionToCollection from "../components/ParcelTransactionComponents/OrderFromTransactionToCollection/OrderFromTransactionToCollection";
import OrderFromCollectionToTransaction from "../components/ParcelTransactionComponents/OrderFromCollectionToTransaction/OrderFromCollectionToTransaction.js";
import RecipientOrderTransaction from "../components/ParcelTransactionComponents/RecipientOrderTransaction/RecipientOrderTransaction.js";
import ParcelTransactionStatusStatistics from "../components/ParcelTransactionComponents/ParcelStatusStatistics/ParcelTransactionStatusStatistics.js";
import { FaCalendarDays } from "react-icons/fa6";

function ParcelTransactionPage() {
  const [showAddNewSenderOrderModal, setShowAddNewSenderOrderModal] =
    useState(false);

  useEffect(() => {
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToSection("parcel-transaction-page");
  }, []);
  const getGreetingMessage = () => {
    const today = new Date();
    const userName =
      JSON.parse(localStorage.getItem("account"))?.user_info?.name ??
      "Manh Hung";
    if (today.getHours() >= 0 && today.getHours() < 12)
      return `Good morning, ${userName}!`;
    else if (today.getHours() <= 18) return `Good afternoon, ${userName}!`;
    return `Good evening, ${userName}!`;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const arr = today.toDateString().split(" ");
    return `${arr[2]} ${arr[1]}, ${arr[3]}`;
  };
  return (
    <Container className="parcel-transaction-page" id="parcel-transaction-page">
      <header className="header">
        <div className="left">
          <h3>{getGreetingMessage()}</h3>
          <p>Welcome back, let's begin your work at transaction hub here.</p>
        </div>
        <div className="right">
          <div className="calendar">
            <FaCalendarDays className="icon" />
            <p>{getCurrentDate()}</p>
          </div>
        </div>
      </header>
      <div className="sender-order-and-transfer-order">
        <div className="left-content">
          <img
            src={homeDeliveryWorker}
            alt="Home delivery worker"
            className="img"
          />
          <h3>
            Start your day with a <span>new customer's parcel</span>
          </h3>
          <button onClick={() => setShowAddNewSenderOrderModal(true)}>
            Add a new parcel <FaPlus className="icon" />
          </button>
        </div>
        <div className="right-content">
          <OrderFromTransactionToCollection />
        </div>
      </div>
      <div className="confirm-create-collection-recipient">
        <OrderFromCollectionToTransaction itemsPerPage={4} />
        <RecipientOrderTransaction itemsPerPage={4} />
      </div>
      <ParcelTransactionStatusStatistics />
      <SenderOrderTransaction
        show={showAddNewSenderOrderModal}
        setShow={setShowAddNewSenderOrderModal}
      />
    </Container>
  );
}

export default ParcelTransactionPage;
