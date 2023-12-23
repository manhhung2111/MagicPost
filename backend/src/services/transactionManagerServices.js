import User from "../models/User";
import Center from "../models/Center";

const createNewEmployee = async (data, user) => {
  try {
    const curCenter = user.center_name;
    data["center_name"] = curCenter;
    data["role_name"] = "GDV";

    const result = await User.create(data);
    return {
      errorCode: 0,
      data: result,
      message: "Create new employee successfully",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getAllEmployees = async () => {
  const center_name = "GD1";
  const result = await User.find({
    center_name: center_name,
    role_name: "GDV",
  });
  return result;
};

export { createNewEmployee, getAllEmployees };
