import User from "../models/User";

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

const getAllEmployees = async (user) => {};

const updateEmployee = async (id, data) => {};

const deleteEmployee = async (id) => {
  // update deleted = true
};

const getIncomingParcels = async (user) => {};

const getOutgoingParcels = async (user) => {};

const getEmployeeContribution = async (user) => {};
export {
  createNewEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getIncomingParcels,
  getOutgoingParcels,
  getEmployeeContribution,
};
