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

export {
  handleGetAllDistricts,
  handleCreateSenderOrder,
  handleGetAllOrdersCreatedBy,
  handleCreateOrderFromTransactionToCollection,
};
