import User from "../models/User";
import Center from "../models/Center";

const handleCreateGDV = async (req) => {
  const curCenter = req.user.center_name;
  let updateData = req.body;
  updateData["center_name"] = curCenter;
  const result = await User.create(updateData);
  if (result) {
    return {
      errorCode: 0,
      data: result,
      message: "Create user successfully",
    };
  }
  return {
    errorCode: 1,
    data: "",
    message: "Cannot create user",
  };
};

const handleGetAllGDV = async () => {
  const center_name = "GD1";
  const result = await User.find({
    center_name: center_name,
    role_name: "GDV",
  });
  console.log(result);
  return result;
};

const handleGetAllOrderDGD = async () => {
  const center_name = "GD1";
  const result = await Center.find({
    center_name: center_name,
    role_name: "GDV",
  });
  console.log(result);
  return result;
};

export { handleCreateGDV, handleGetAllGDV, handleGetAllOrderDGD };
