import axios from "../config/axiosConfig";

const handleGetAllDistricts = async () => {
  const result = await axios.get("resLocations");
  return result;
};

const handleCreateSenderOrder = async (packageInfo) => {
  const result = await axios.post("order", { ...packageInfo });
  return result;
};

export { handleGetAllDistricts, handleCreateSenderOrder };
