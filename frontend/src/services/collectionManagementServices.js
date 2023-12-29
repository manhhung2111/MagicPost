import axios from "../config/axiosConfig";

const handleCreateNewEmployee = async (data) => {
  const result = await axios.post("collection-mana/employee", data);
  return result;
};

const handleGetAllEmployee = async () => {
  const result = await axios.get("collection-mana/employee");
  return result;
};

const handleUpdateEmployee = async (data) => {
  const result = await axios.put("collection-mana/employee", data);
  return result;
};

const handleDeleteEmployee = async (user_name) => {
  const result = await axios.put("collection-mana/employee-delete", {
    user_name: user_name,
  });
  return result;
};

const handleGetIncomingParcels = async (sortBy) => {
  const result = await axios.post("collection-mana/incoming-order", {
    sort: sortBy,
  });
  return result;
};

const handleGetOutgoingParcels = async (sortBy) => {
  const result = await axios.post("collection-mana/outgoing-order", {
    sort: sortBy,
  });
  return result;
};

const handleGetEmployeeContribution = async () => {
  const result = await axios.get("collection-mana/employee-contribution");
  return result;
};
export {
  handleCreateNewEmployee,
  handleGetAllEmployee,
  handleUpdateEmployee,
  handleDeleteEmployee,
  handleGetIncomingParcels,
  handleGetOutgoingParcels,
  handleGetEmployeeContribution,
};
