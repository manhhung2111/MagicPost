const express = require("express");
const router = express.Router();
const { requireAuthGDV } = require("../middlewares/requireAuthDGD");
import {
  handleCreateOrder,
  handleConfirmOrder,
  handleGetOrdersToTranferToCollectionHub,
  handleCreateShipmentToRecipient,
  handleGetAllTransactionPoints,
  handleGetIncomingOrders,
  handleTransferOrdersToCollectionHub,
  handleConfirmRecipientShipment,
  handleGetAllOrderToShip,
  handleGetAllRecipientShipment,
  handleGetStatsOrders,
  handleGetContribution,
} from "../controllers/transactionEmployeeController";

// AUTHENTICATION
router.use(requireAuthGDV);
// create order
router.post("/order", handleCreateOrder);
router.get("/locations", handleGetAllTransactionPoints);

//get and transfer orders to collection
router.get("/order/collection", handleGetOrdersToTranferToCollectionHub);
router.put("/order/collection", handleTransferOrdersToCollectionHub);

//get and confirm incoming parcels
router.post("/order/incoming", handleGetIncomingOrders);
router.put("/order/incoming", handleConfirmOrder);

//create new shipment to recipient
router.post("/ready-shipment", handleGetAllOrderToShip);
router.post("/shipment", handleCreateShipmentToRecipient);
//update shipment status
router.put("/recipient-shipment", handleConfirmRecipientShipment);
router.post("/recipient-shipment", handleGetAllRecipientShipment);

// get success and unsuccess orders
router.get("/order/stats", handleGetStatsOrders);
router.get("/contribution", handleGetContribution);
export default router;
