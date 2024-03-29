import User from "../models/User";
import Order from "../models/Order";
import bcrypt from 'bcrypt'

const createNewEmployee = async (data, user) => {
  try {
    const user_name = data["user_name"]
    const exists = await User.findOne({user_name : user_name})
    if (exists) {
        throw Error('Username already in use')
    }

    const curCenter = user.center_name;
    data["center_name"] = curCenter;
    data["role_name"] = "GDV";

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

const getAllEmployees = async (user, sort) => {
  try {
    const curCenter = user.center_name;

    const result = await User.find({
      center_name: curCenter,
      role_name: "GDV",
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
    const result = await User.updateOne({ _id: id }, data);
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
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getEmployeeContribution = async (user) => {
  try {
    const allEmployees = (await getAllEmployees(user)).data.packages;
    const result = [];
    for (let i = 0; i < allEmployees.length; i++) {
      const in_out = (await getAllIncomingAndOutGoing(allEmployees[i])).data
        .total_in_out;
      result.push({ name: allEmployees[i].name, parcel: in_out });
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
