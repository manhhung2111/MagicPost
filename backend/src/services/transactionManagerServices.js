import User from "../models/User";
import Order from "../models/Order";
import { getAllIncomingAndOutGoing } from "../services/transactionEmployeeServices";

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

const getAllEmployees = async (user, sort) => {
  try {
    const curCenter = user.center_name;

    const result = await User.find({
      center_name: curCenter,
      role_name: "GDV",
    })
      .select("name address phone email user_name -_id")
      .sort({ name: 1 });

    // if (sort === "Username") {
    //   result.sort({ user_name: 1 });
    // }
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

// đơn hàng đến : đơn hàng dc chuyển đi
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
  // outgoing : có path là cetner hiện tại và time departed true
  // tổng số đơn hàng outgoing
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
    const allEmployees = (await getAllEmployees(user)).data.packages;
    const result = [];
    for (let i = 0; i < allEmployees.length; i++) {
      const in_out = (await getAllIncomingAndOutGoing(allEmployees[i])).data
        .total_in_out;
      result.push({name: allEmployees[i].name, parcel: in_out});
    }
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
