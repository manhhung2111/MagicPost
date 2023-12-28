import User from "../models/User";
import Order from "../models/Order";

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
    })
      .select("name address phone email user_name -_id")
      .sort({ name: 1 });

    return {
      errorCode: 0,
      data: { packages: result, totalEmployee: result.length },
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

const updateEmployee = async (data) => {
  try {
    const { user_name, email, name, phone, address } = data;
    const result = await User.findOneAndUpdate({ user_name: user_name }, data);
    return {
      errorCode: 0,
      data: result,
      message: `Update ${user_name} info successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const deleteEmployee = async (user_name) => {
  try {
    const result = await User.updateOne(
      { user_name: user_name },
      { $set: { deleted: true } }
    );
    return {
      errorCode: 0,
      data: result,
      message: `Delete ${user_name} successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getIncomingParcels = async (user, sort) => {
  try {
    const curCenter = user.center_name;
    const allOrders = await Order.find();
    let result = [];
    for (let i = 0; i < allOrders.length; i++) {
      const paths = allOrders[i].paths;
      for (let j = 1; j < paths.length; j++) {
        const previous = paths[j - 1];
        if (
          previous.isConfirmed &&
          previous.time.timeDeparted != "" &&
          paths[j].center_code == curCenter
        ) {
          result.push({
            parcelId: allOrders[i].parcelId,
            source: previous.center_code,
            service: allOrders[i].packageInfo.additionalService,
            status: paths[j].isConfirmed ? "Confirmed" : "Pending",
          });
          break;
        }
      }
    }
    if (sort && sort === "Status") {
      result.sort(function compareStatus(order1, order2) {
        return order1.status > order2.status
          ? 1
          : order1.status < order2.status
          ? -1
          : 0;
      });
    } else {
      result.sort(function compareId(order1, order2) {
        return order1.parcelId > order2.parcelId
          ? 1
          : order1.parcelId < order2.parcelId
          ? -1
          : 0;
      });
    }
    return {
      errorCode: 0,
      data: { packages: result, totalOrders: result.length },
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

const getOutgoingParcels = async (user, sort) => {
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
          if (j + 1 < paths.length && paths[j + 1].center_code) {
            dest = paths[j + 1].center_code;
          }
          const dispatch_date =
            paths[j].time.timeDeparted.split(",")[1] +
            ", " +
            paths[j].time.timeDeparted.split(",")[2];
          const data = {
            parcelId: allOrders[i].parcelId,
            destination: dest || curCenter,
            dispatch_date: dispatch_date,
            service: allOrders[i].packageInfo.additionalService,
          };
          result.push(data);
          break;
        }
      }
    }
    if (sort && sort === "Date") {
      result.sort(function compareDates(order1, order2) {
        const date1 = new Date(order1.dispatch_date);
        const date2 = new Date(order2.dispatch_date);
        return date1 > date2 ? 1 : date1 < date2 ? -1 : 0;
      });
    } else {
      result.sort(function compareDest(order1, order2) {
        return order1.destination > order2.destination
          ? 1
          : order1.destination < order2.destination
          ? -1
          : 0;
      });
    }
    return {
      errorCode: 0,
      data: { packages: result, totalOrders: result.length },
      message: `Get all outgoing parcel from center ${curCenter} successfully`,
    };
  } catch (error) {
    console.log(error.message);
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
