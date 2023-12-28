import {
  createNewEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getIncomingParcels,
  getOutgoingParcels,
  getEmployeeContribution,
} from "../services/transactionManagerServices";

const handleCreateNewEmployee = async (req, res) => {
  const user = req.user;
  const result = await createNewEmployee(req.body, user);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetAllEmployees = async (req, res) => {
  const user = req.user;
  const result = await getAllEmployees(user);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleUpdateEmployee = async (req, res) => {
  const { id, data } = req.body;
  const result = await updateEmployee(id, data);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleDeleteEmployee = async (req, res) => {
  const { id } = req.body;
  const result = await deleteEmployee(id);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetIncomingParcels = async (req, res) => {
  const user = req.user;
  const result = await getIncomingParcels(user);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetOutgoingParcels = async (req, res) => {
  const user = req.user;
  const result = await getOutgoingParcels(user);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetEmployeeContribution = async (req, res) => {
  const { user } = req.user;
  const result = await getEmployeeContribution(user);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};
export {
  handleCreateNewEmployee,
  handleGetAllEmployees,
  handleUpdateEmployee,
  handleDeleteEmployee,
  handleGetIncomingParcels,
  handleGetOutgoingParcels,
  handleGetEmployeeContribution,
};
