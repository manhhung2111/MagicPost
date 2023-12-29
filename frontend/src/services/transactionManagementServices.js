import axios from "../config/axiosConfig";

const handleCreateNewEmployee = async (data) => {
  const result = await axios.post("trans-mana/employee", data);
  return result;
};

const handleGetAllEmployee = async () => {
  const result = await axios.get("trans-mana/employee");
  return result;
};

const handleUpdateEmployee = async (data) => {
  const result = await axios.put("trans-mana/employee", data);
  return result;
};

const handleDeleteEmployee = async (user_name) => {
  const result = await axios.put("trans-mana/employee-delete", {
    user_name: user_name,
  });
  return result;
};

const handleGetIncomingParcels = async (sortBy) => {
  const result = await axios.post("trans-mana/incoming-order", {sort: sortBy});
  return result;
};

const handleGetOutgoingParcels = async (sortBy) => {
  const result = await axios.post("trans-mana/outgoing-order", {sort: sortBy});
  return result;
};

const handleGetEmployeeContribution = async () => {
  const result = await axios.get("trans-mana/employee-contribution");
  return result;
}
export {
  handleCreateNewEmployee,
  handleGetAllEmployee,
  handleUpdateEmployee,
  handleDeleteEmployee,
  handleGetIncomingParcels,
  handleGetOutgoingParcels, handleGetEmployeeContribution
};
