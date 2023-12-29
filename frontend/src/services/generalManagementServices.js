import axios from "../config/axiosConfig";

const handleCreateNewManager = async (data) => {
  const result = await axios.post("general-mana/manager", data);
  return result;
};

const handleUpdateManager = async (data) => {
  const result = await axios.put("general-mana/manager", data);
  return result;
};

const handleDeleteManager = async (user_name) => {
  const result = await axios.put("general-mana/manager-delete", {
    user_name: user_name,
  });
  return result;
};

const handleGetCentersInfo = async () => {
  const result = await axios.get("general-mana/center-info");
  return result;
};

const handleGetAllManagers = async () => {
  const result = await axios.get("general-mana/manager");
  return result;
};

const handleGetTransactionStatistics = async () => {
  const result = await axios.get("general-mana/transaction-statistic");
  return result;
};

const handleGetCollectionStatistics = async () => {
  const result = await axios.get("general-mana/collection-statistic");
  return result;
};
export {
  handleCreateNewManager,
  handleUpdateManager,
  handleDeleteManager,
  handleGetCentersInfo,
  handleGetAllManagers,
  handleGetTransactionStatistics,
  handleGetCollectionStatistics,
};
