import {
  confirmOrderFromCollectionHub,
  createOrder,
  createShipmentToRecipient,
  getOrdersToCollectionHub,
  getAllTransactionPoints,
  getIncomingOrdersToConfirm,
  confirmRecipientShipment,
  transferOrdersToCollectionHub,
  getAllOrderToShip,
  getSuccessOrders,
  getUnsuccessOrders,
} from "../services/transactionEmployeeServices";

const handleCreateOrder = async (req, res) => {
  const data = req.body;
  const result = await createOrder(data, req.user);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetAllTransactionPoints = async (req, res) => {
  const result = await getAllTransactionPoints();

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetIncomingOrders = async (req, res) => {
  const result = await getIncomingOrdersToConfirm(req.user);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleConfirmOrder = async (req, res) => {
  const { parcelId } = req.body;
  const result = await confirmOrderFromCollectionHub(parcelId, req.user);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetOrdersToTranferToCollectionHub = async (req, res) => {
  const result = await getOrdersToCollectionHub(req.user);

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleTransferOrdersToCollectionHub = async (req, res) => {
  const { parcelIds } = req.body;
  const result = await transferOrdersToCollectionHub(parcelIds, req.user);

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetAllOrderToShip = async (req, res) => {
  const result = await getAllOrderToShip(req.user);

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};
const handleCreateShipmentToRecipient = async (req, res) => {
  const { parcelId } = req.body;
  const result = await createShipmentToRecipient(req.user, parcelId);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleConfirmRecipientShipment = async (req, res) => {
  const { parcelId, status } = req.body;
  const result = await confirmRecipientShipment(parcelId, status);
  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetAllSuccessOrders = async (req, res) => {
  const user = req.user;
  const result = await getSuccessOrders(user);
  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetAllUnsuccessOrders = async (req, res) => {
  const user = req.user;
  const result = await getUnsuccessOrders(user);
  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

export {
  handleCreateOrder,
  handleConfirmOrder,
  handleGetOrdersToTranferToCollectionHub,
  handleCreateShipmentToRecipient,
  handleGetAllTransactionPoints,
  handleGetIncomingOrders,
  handleConfirmRecipientShipment,
  handleTransferOrdersToCollectionHub,
  handleGetAllOrderToShip,
  handleGetAllSuccessOrders,
  handleGetAllUnsuccessOrders,
};
