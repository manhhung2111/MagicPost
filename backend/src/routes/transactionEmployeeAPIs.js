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
  handleGetAllSuccessOrders,
  handleGetAllUnsuccessOrders,
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
router.get("/order/incoming", handleGetIncomingOrders);
router.put("/order/incoming", handleConfirmOrder);

//create new shipment to recipient
router.get("/shipment", handleGetAllOrderToShip)
router.post("/shipment", handleCreateShipmentToRecipient);
//update shipment status
router.put("/shipment", handleConfirmRecipientShipment);

// get success and unsuccess orders
router.get("/order/success", handleGetAllSuccessOrders);
router.get("/order/unsuccess", handleGetAllUnsuccessOrders);

export default router;
