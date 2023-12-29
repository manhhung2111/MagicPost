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
  const {sort} = req.body;
  const result = await getAllEmployees(user, sort);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleUpdateEmployee = async (req, res) => {
  const result = await updateEmployee(req.body);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleDeleteEmployee = async (req, res) => {
  const {user_name} = req.body;
  const result = await deleteEmployee(user_name);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetIncomingParcels = async (req, res) => {
  const user = req.user;
  const {sort} = req.body;
  const result = await getIncomingParcels(user, sort);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetOutgoingParcels = async (req, res) => {
  const user = req.user;

  const {sort} = req.body;
  const result = await getOutgoingParcels(user, sort);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetEmployeeContribution = async (req, res) => {
  const user = req.user;
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
