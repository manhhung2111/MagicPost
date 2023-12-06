import Container from "react-bootstrap/Container";
import ConfirmOrderFromCollectionToCollection from "../components/ParcelCollectionComponents/ConfirmOrderFromCollectionToCollection/ConfirmOrderFromCollectionToCollection";
import CreateOrderFromCollectionToCollection from "../components/ParcelCollectionComponents/CreateOrderFromCollectionToCollection/CreateOrderFromCollectionToCollection";
import ConfirmOrderFromTransactionToCollection from "../components/ParcelCollectionComponents/ConfirmOrderFromTransactionToCollection/ConfirmOrderFromTransactionToCollection";
import CreateOrderFromCollectionToTransaction from "../components/ParcelCollectionComponents/CreateOrderFromCollectionToTransaction/CreateOrderFromCollectionToTransaction";
import { FaCalendarDays } from "react-icons/fa6";
import ParcelCollectionStatusStatistics from "../components/ParcelCollectionComponents/ParcelCollectionStatistics/ParcelCollectionStatistics";
import { useEffect } from "react";

function ParcelCollectionPage() {
  useEffect(() => {
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: "smooth" });
      }
    };
    scrollToSection("parcel-collection-page");
  }, []);
  const getGreetingMessage = () => {
    const today = new Date();
    const userName =
      JSON.parse(localStorage.getItem("account")).name ?? "Manh Hung";
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
    <Container className="parcel-collection-page" id="parcel-collection-page">
      <header className="header" >
        <div className="left">
          <h3>{getGreetingMessage()}</h3>
          <p>Welcome back, let's begin your work at collection hub here.</p>
        </div>
        <div className="right">
          <div className="calendar">
            <FaCalendarDays className="icon" />
            <p>{getCurrentDate()}</p>
          </div>
        </div>
      </header>
      <div className="collection-hub-hub">
        <ConfirmOrderFromCollectionToCollection />
        <CreateOrderFromCollectionToCollection />
      </div>
      <div className="transaction-to-collection">
        <CreateOrderFromCollectionToTransaction />
        <ConfirmOrderFromTransactionToCollection />
      </div>
      <ParcelCollectionStatusStatistics />
    </Container>
  );
}

export default ParcelCollectionPage;
