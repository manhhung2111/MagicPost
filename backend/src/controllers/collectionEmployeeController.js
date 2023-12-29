import {
  confirmIncomingCollectionOrder,
  getIncomingCollectionOrder,
  getNearbyTransactionHubs,
  getNearbyCollectionHubs,
  getOrdersToTransferCollection,
  transferOrdersToCollectionHub,
  getIncomingTransactionOrder,
  confirmIncomingTransactionOrder,
  getOrdersToTransferTransaction,
  transferOrdersToTransactionHub,
  getStatsOrders,
} from "../services/collectionEmployeeServices";

const handleGetIncomingCollectionOrder = async (req, res) => {
  const user = req.user;
  const result = await getIncomingCollectionOrder(user);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleConfirmIncomingCollectionOrder = async (req, res) => {
  const { parcelId } = req.body;
  const user = req.user;
  const result = await confirmIncomingCollectionOrder(parcelId, user);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetNearbyCollectionHubs = async (req, res) => {
  const user = req.user;
  const result = await getNearbyCollectionHubs(user);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetOrdersToTransferCollection = async (req, res) => {
  const user = req.user;
  const result = await getOrdersToTransferCollection(user);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleTransferOrdersToCollectionHub = async (req, res) => {
  const { parcelIds, nextCenter } = req.body;
  const user = req.user;
  const result = await transferOrdersToCollectionHub(
    parcelIds,
    nextCenter,
    user
  );

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetIncomingTransactionOrder = async (req, res) => {
  const user = req.user;
  const { query } = req.body;
  const result = await getIncomingTransactionOrder(user, query);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleConfirmIncomingTransactionOrder = async (req, res) => {
  const { parcelId } = req.body;
  const user = req.user;
  const result = await confirmIncomingTransactionOrder(parcelId, user);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetNearbyTransactionHubs = async (req, res) => {
  const user = req.user;
  const result = await getNearbyTransactionHubs(user);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetOrdersToTransferTransaction = async (req, res) => {
  const user = req.user;
  const result = await getOrdersToTransferTransaction(user);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleTransferOrdersToTransactionHub = async (req, res) => {
  const { parcelIds, nextCenter } = req.body;
  const user = req.user;
  const result = await transferOrdersToTransactionHub(
    parcelIds,
    nextCenter,
    user
  );

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetStatsOrders = async (req, res) => {
  const user = req.user;
  const result = await getStatsOrders(user);
  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

export {
  handleConfirmIncomingCollectionOrder,
  handleGetIncomingCollectionOrder,
  handleGetNearbyTransactionHubs,
  handleGetNearbyCollectionHubs,
  handleTransferOrdersToCollectionHub,
  handleTransferOrdersToTransactionHub,
  handleGetIncomingTransactionOrder,
  handleConfirmIncomingTransactionOrder,
  handleGetOrdersToTransferTransaction,
  handleGetOrdersToTransferCollection,
  handleGetStatsOrders,
};
