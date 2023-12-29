import User from "../models/User";
import Order from "../models/Order";
import {getAllIncomingAndOutGoing} from "../services/collectionEmployeeServices"

const createNewEmployee = async (data, user) => {
  try {
    const curCenter = user.center_name;
    data["center_name"] = curCenter;
    data["role_name"] = "TKV";

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

const getAllEmployees = async (user) => {
  try {
    const curCenter = user.center_name;

    const result = await User.find({
      center_name: curCenter,
      role_name: "TKV",
    }).select("name address phone -_id");
    return {
      errorCode: 0,
      data: result,
      message: `Get all employee from center ${curCenter} successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const updateEmployee = async (id, data) => {
  try {
    const result = await User.updateOne({ _id: id }, data);
    return {
      errorCode: 0,
      data: result,
      message: `Update employee has ${id} successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const deleteEmployee = async (id) => {
  try {
    const result = await User.updateOne(
      { _id: id },
      { $set: { deleted: true } }
    );
    return {
      errorCode: 0,
      data: result,
      message: `Delete employee  successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getIncomingParcels = async (user) => {
  try {
    const curCenter = user.center_name;

    const allOrders = await Order.find();
    let result = [];
    for (let i = 0; i < allOrders.length; i++) {
      const paths = allOrders[i].paths;
      for (let j = 1; j < paths.length; j++) {
        const previous = paths[j - 1];
        if (previous.isConfirmed && paths[j].center_code == curCenter) {
          result.push(allOrders[i]);
          break;
        }
      }
    }
    return {
      errorCode: 0,
      data: result,
      message: `Get all incoming parcel to center ${curCenter} successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getOutgoingParcels = async (user) => {
  try {
    const curCenter = user.center_name;

    const allOrders = await Order.find();
    let result = [];
    for (let i = 0; i < allOrders.length; i++) {
      const paths = allOrders[i].paths;
      for (let j = 0; j < paths.length; j++) {
        if (
          paths[j].center_code == curCenter &&
          paths[j].time.timeDeparted != ""
        ) {
          let dest = "";
          if (i + 1 < paths.length && paths[j + 1].center_code) {
            dest = paths[j + 1].center_code;
          }

          const data = {
            parcel_id: allOrders[i].parcelId,
            destination: dest,
            dispatch_date: paths[j].time.timeDeparted,
          };
          result.push(data);
          break;
        }
      }
    }
    return {
      errorCode: 0,
      data: result,
      message: `Get all outgoing parcel from center ${curCenter} successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getEmployeeContribution = async (user) => {
  // tong don hang cua moi employee incoming va outgoing
  // center {icomgin: 12, outgoing: 12}

  try {
    const allEmployees = (await getAllEmployees(user)).data;
    console.log(allEmployees);
    const result = {};
    let total = 0;
    for (let i = 0; i < allEmployees.length; i++) {
      const in_out = (await getAllIncomingAndOutGoing(allEmployees[i])).data
        .total_in_out;
      result[allEmployees[i].name] = in_out;
      total += in_out;
    }
    result["total"] = total;
    return {
      errorCode: 0,
      data: result,
      message: `Get all contribution of employees from center ${user.center_name} successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

export {
  createNewEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getIncomingParcels,
  getOutgoingParcels,
  getEmployeeContribution,
};
