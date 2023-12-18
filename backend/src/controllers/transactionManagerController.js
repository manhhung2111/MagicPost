import {
  createNewEmployeeAndShipper,
  getAllEmployees,
} from "../services/transactionManagerServices";

const handleCreateEmployeeAndShipper = async (req, res) => {
  const result = await createNewEmployeeAndShipper(data);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetAllEmployees = async (req, res) => {
  const result = await getAllEmployees(data);

  const statusCode =
    result.errorCode === 0 ? 200 : result.errorCode === 1 ? 400 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

export {
  handleCreateEmployeeAndShipper,
  handleGetAllEmployees,
};
