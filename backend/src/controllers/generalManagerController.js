import Center from "../models/Center";
import Order from "../models/Order";
import User from "../models/User";
import _ from "lodash";
import {
  createNewCenter,
  getAllDGDs,
  getAllDTKs,
  getAllTDGDs,
  getAllTDTKs,
  getAllIncoming,
  getAllOutgoing,
  createNewManager,
  updateManager,
  deleteManager,
  getAllCentersInfo,
  getAllManager, getCollectionStatistics, getTransactionStatistics
} from "../services/generalManagerServices";

const handleGetDTK = async () => {
  let result = await Center.find({ parent_center_name: null });
  const tmp = _.cloneDeep(result);

  // Use Promise.all to wait for all asynchronous calls to complete
  await Promise.all(
    tmp.map(async (item, i) => {
      const details = await User.find({
        user_name: item["user_name"],
      }).select("name phone email -_id");
      tmp[i]["detail_user_name"] = details;
    })
  );

  return tmp;
};

const handleGetAllOrders = async () => {};

const handleCreateNewCenter = async (req, res) => {
  const data = req.body;
  const result = await createNewCenter(data);

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleCreateNewManager = async (req, res) => {
  const data = req.body;
  const result = await createNewManager(data);

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleUpdateManager = async (req, res) => {
  const data = req.body;
  const result = await updateManager(data);

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleDeleteManager = async (req, res) => {
  const { user_name } = req.body;
  const result = await deleteManager(user_name);

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetAllDGDs = async (req, res) => {
  const result = await getAllDGDs();

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetAllDTKs = async (req, res) => {
  const result = await getAllDTKs();

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetAllTDGDs = async (req, res) => {
  const result = await getAllTDGDs();

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetAllTDTKs = async (req, res) => {
  const result = await getAllTDTKs();

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetAllIncoming = async (req, res) => {
  const { center_name } = req.body;
  const result = await getAllIncoming(center_name);

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetAllOutgoing = async (req, res) => {
  const { center_name } = req.body;
  const result = await getAllOutgoing(center_name);

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetCentersInfo = async (req, res) => {
  const result = await getAllCentersInfo();

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetAllManager = async (req, res) => {
  const result = await getAllManager();

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetCollectionStatistics = async (req, res) => {
  const result = await getCollectionStatistics();

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

const handleGetTransactionStatistics = async (req, res) => {
  const result = await getTransactionStatistics();

  const statusCode = result.errorCode === 0 ? 200 : 500;
  return res.status(statusCode).json({
    ...result,
  });
};

export {
  handleGetDTK,
  handleCreateNewCenter,
  handleGetAllDGDs,
  handleGetAllDTKs,
  handleGetAllTDGDs,
  handleGetAllTDTKs,
  handleGetAllIncoming,
  handleGetAllOutgoing,
  handleCreateNewManager,
  handleDeleteManager,
  handleUpdateManager,
  handleGetCentersInfo,
  handleGetAllManager,
  handleGetCollectionStatistics,
  handleGetTransactionStatistics,
};
