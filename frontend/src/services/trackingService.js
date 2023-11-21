import axios from "../config/axiosConfig";

const handleGetParcelById = async (id) => {
  const result = await axios.get(`order?id=${id}`);
  return result;
};



export { handleGetParcelById };
