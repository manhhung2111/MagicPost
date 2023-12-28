import User from "../models/User";
import Order from "../models/Order";

const createNewEmployee = async (data, user) => {
  try {
    const user_name = data["user_name"]
    const exists = await User.findOne({user_name : user_name})
    if (exists) {
        throw Error('Username already in use')
    }

    const curCenter = user.center_name;
    data["center_name"] = curCenter;
    data["role_name"] = "TKV";

    const raw_pass = data["password"]
    const salt = await bcrypt.genSalt(10)
    const encrypted_pass = await bcrypt.hash(raw_pass, salt)
    data["password"] = encrypted_pass

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
    const raw_pass = data["password"]
    const salt = await bcrypt.genSalt(10)
    const encrypted_pass = await bcrypt.hash(raw_pass, salt)
    data["password"] = encrypted_pass
    
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
