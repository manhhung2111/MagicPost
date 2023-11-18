import Center from "../models/Center";
import Order from "../models/Order";
import User from "../models/User";
import _ from "lodash";

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

export { handleGetDTK };
