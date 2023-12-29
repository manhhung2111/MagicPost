import axios from "../config/axiosConfig";

const handleGetAllDistricts = async () => {
  const result = await axios.get("trans-emp/locations");
  return result;
};

const handleCreateSenderOrder = async (packageInfo) => {
  const result = await axios.post("trans-emp/order", { ...packageInfo });
  return result;
};

const handleGetAllOrdersCreatedBy = async () => {
  const result = await axios.get("trans-emp/order/collection");
  return result;
};

const handleCreateOrderFromTransactionToCollection = async (data) => {
  const result = await axios.put("trans-emp/order/collection", data);
  return result;
};

const handleGetIncomingOrdersFromCollectionHub = async (sort, parcelType) => {
  const data = {
    query: {
      sort,
      parcelType,
    },
  };
  const result = await axios.post("trans-emp/order/incoming", data);
  return result;
};

const handleConfirmOrdersFromCollectionHub = async (parcelId) => {
  const result = await axios.put("trans-emp/order/incoming", {
    parcelId,
  });
  return result;
};

const handleGetAllOrdersToShip = async (sort, parcelType) => {
  const data = {
    query: {
      sort,
      parcelType,
    },
  };
  const result = await axios.post("trans-emp/ready-shipment", data);
  return result;
};

const handleCreateShipmentToRecipient = async (parcelId) => {
  const result = await axios.post("trans-emp/shipment", { parcelId });
  return result;
};

const handleGettAllRecipientShipment = async (sort, status) => {
  const data = {
    query: {
      sort,
      status: status,
    },
  };
  const result = await axios.post("trans-emp/recipient-shipment", data);
  return result;
};

const handleConfirmRecipientShipmentStatus = async (parcelId, status) => {
  const result = await axios.put("trans-emp/recipient-shipment", {
    parcelId,
    status,
  });
  return result;
};

const handleGetOrderStatistics = async () => {
  const result = await axios.get("trans-emp/order/stats");
  return result;
};

const handleGetContribution = async () => {
  const result = await axios.get("trans-emp/contribution");
  return result;
}
export {
  handleGetAllDistricts,
  handleCreateSenderOrder,
  handleGetAllOrdersCreatedBy,
  handleCreateOrderFromTransactionToCollection,
  handleGetIncomingOrdersFromCollectionHub,
  handleConfirmOrdersFromCollectionHub,
  handleGetAllOrdersToShip,
  handleCreateShipmentToRecipient,
  handleGettAllRecipientShipment,
  handleConfirmRecipientShipmentStatus,
  handleGetOrderStatistics, handleGetContribution
};
