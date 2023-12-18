import {
  confirmShipment,
  createShipmentToNextCenter,
  getAllTransactionAndCollectionsCenter,
  getIncomingShipments,
  getResponsibleOrders,
} from "../services/collectionEmployeeServices";

const handleVerifyShipment = async (req, res) => {
  const result = await confirmShipment(data);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetAllTransactionAndCollectionsCenter = async (req, res) => {
  const result = await getAllTransactionAndCollectionsCenter(data);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetResponsibleOrder = async (req, res) => {
  const result = await getResponsibleOrders(data);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleCreateShipment = async (req, res) => {
  const result = await createShipmentToNextCenter(data);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetShipmentToCurrentCenter = async (req, res) => {
  const result = await getIncomingShipments(data);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

export {
  handleVerifyShipment,
  handleGetResponsibleOrder,
  handleCreateShipment,
  handleGetAllTransactionAndCollectionsCenter,
  handleGetShipmentToCurrentCenter,
};
