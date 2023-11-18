import User from "../models/User";
import Center from "../models/Center";

const handleCreateGDV = async (data) => {
  const result = await User.create(data);
  return result;
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
