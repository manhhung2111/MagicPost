import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TrackingPage from "./pages/TrackingPage";
import ParcelTransactionPage from "./pages/ParceTransactionPage";
import SenderOrderTransaction from "./components/ParcelTransactionComponents/SenderOrderTransaction/SenderOrderTransaction";
import RecipientOrderConfirmation from "./components/ParcelTransactionComponents/RecipientOrderConfirmation/RecipientOrderConfirmation";
import OrderFromTransactionToCollection from "./components/ParcelTransactionComponents/OrderFromTransactionToCollection/OrderFromTransactionToCollection";
import OrderFromCollectionToTransaction from "./components/ParcelTransactionComponents/OrderFromCollectionToTransaction/OrderFromCollectionToTransaction";
import ParcelTransactionStatusStatistics from "./components/ParcelTransactionComponents/ParcelStatusStatistics/ParcelTransactionStatusStatistics";
import RecipientOrderTransaction from "./components/ParcelTransactionComponents/RecipientOrderTransaction/RecipientOrderTransaction";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="tracking" element={<TrackingPage />} />
          <Route path="parcel-transaction" element={<ParcelTransactionPage />}>
            <Route index element={<SenderOrderTransaction />} />
            <Route
              path="delivery-order-collection-point"
              element={<OrderFromTransactionToCollection />}
            />
            <Route
              path="confirm-order-collection-point"
              element={<OrderFromCollectionToTransaction />}
            />
            <Route
              path="recipient-order"
              element={<RecipientOrderTransaction />}
            />
            <Route
              path="confirm-recipient-order"
              element={<RecipientOrderConfirmation />}
            />
            <Route
              path="statistics"
              element={<ParcelTransactionStatusStatistics />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="light"
    />
  </div>
);
