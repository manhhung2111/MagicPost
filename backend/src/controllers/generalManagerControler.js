import Center from "../models/Center";
import Order from "../models/Order";
import User from "../models/User";
import _ from "lodash";
import { createNewCenter } from "../services/generalManagerServices";

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

  console.log(tmp);
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

export { handleGetDTK, handleCreateNewCenter };
