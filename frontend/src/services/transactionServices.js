import axios from "../config/axiosConfig";

const handleGetAllDistricts = async () => {
  const result = await axios.get("gdv/locations");
  return result;
};

const handleCreateSenderOrder = async (packageInfo) => {
  const result = await axios.post("gdv/order", { ...packageInfo });
  return result;
};

const handleGetAllOrdersCreatedBy = async () => {
  const result = await axios.get("gdv/responOrder");
  return result;
};

const handleCreateOrderFromTransactionToCollection = async (order) => {
  const result = await axios.post("shipment", { ...order });
  return result;
};

export {
  handleGetAllDistricts,
  handleCreateSenderOrder,
  handleGetAllOrdersCreatedBy,
  handleCreateOrderFromTransactionToCollection,
};
