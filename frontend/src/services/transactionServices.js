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

export {
  handleGetAllDistricts,
  handleCreateSenderOrder,
  handleGetAllOrdersCreatedBy,
  handleCreateOrderFromTransactionToCollection,
  handleGetIncomingOrdersFromCollectionHub,
  handleConfirmOrdersFromCollectionHub,
  handleGetAllOrdersToShip,
  handleCreateShipmentToRecipient,
};
