import Center from "../models/Center";
import User from "../models/User";
import Order from "../models/Order";

const createNewCenter = async (data) => {
  try {
    const result = await Center.create({ ...data });
    return {
      errorCode: 0,
      data: result,
      message: "Create new center successfully!",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: "Something's wrong",
    };
  }
};

const getAllDGDs = async () => {
  try {
    const result = await Center.find({ center_code: /^DGD/ });
    return {
      errorCode: 0,
      data: result,
      message: "Get all DGD successfully!",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getAllDTKs = async () => {
  try {
    const result = await Center.find({ center_code: /^DTK/ });
    return {
      errorCode: 0,
      data: result,
      message: "Get all DTK successfully!",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getAllTDGDs = async () => {
  try {
    const result = await User.find({ role_name: "GDT" });
    return {
      errorCode: 0,
      data: result,
      message: "Get all TDGD successfully!",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getAllTDTKs = async () => {
  try {
    const result = await User.find({ role_name: "TKT" });
    return {
      errorCode: 0,
      data: result,
      message: "Get all TDTK successfully!",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getAllIncoming = async (name_center) => {
  try {
    const allOrders = await Order.find();
    let result = [];
    for (let i = 0; i < allOrders.length; i++) {
      const paths = allOrders[i].paths;
      for (let j = 1; j < paths.length; j++) {
        const previous = paths[j - 1];
        if (previous.isConfirmed && paths[j].center_code == name_center) {
          result.push(allOrders[i]);
          break;
        }
      }
    }
    return {
      errorCode: 0,
      data: result,
      message: `Get all incoming parcel to center ${name_center} successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getAllOutgoing = async (name_center) => {
  try {
    const allOrders = await Order.find();
    let result = [];
    for (let i = 0; i < allOrders.length; i++) {
      const paths = allOrders[i].paths;
      for (let j = 0; j < paths.length; j++) {
        if (
          paths[j].center_code == name_center &&
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
      message: `Get all outgoing parcel from center ${name_center} successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const createNewManager = async (data) => {
  try {
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

const updateManager = async (data) => {
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

const deleteManager = async (user_name) => {
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

const getAllManager = async () => {
  try {
    const result = await User.find({ role_name: { $in: ["TKT", "GDT"] } });
    return {
      errorCode: 0,
      data: { packages: result, totalManagers: result.length },
      message: `Get all manager successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getAllCentersInfo = async () => {
  try {
    const result = await Center.find({}).select("center_code name -_id");
    return {
      errorCode: 0,
      data: result,
      message: `Get all centers info successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getTransactionStatistics = async () => {
  try {
    const centers = await Center.find({ center_code: /^DGD/ })
      .select("center_code postalCode -_id")
      .sort({ postalCode: 1 });
    const data = new Map();
    centers.forEach((center) =>
      data.set(center.center_code, {
        totalIncomingOrders: 0,
        totalOutgoingOrders: 0,
      })
    );

    const allOrders = await Order.find({});
    allOrders.forEach((order) => {
      order.paths.forEach((path) => {
        if (path.time.timeArrived) {
          let count = data.get(path.center_code);
          if (count !== undefined) {
            data.set(path.center_code, {
              totalIncomingOrders: count.totalIncomingOrders + 1,
              totalOutgoingOrders: count.totalOutgoingOrders,
            });
          }
        }
        if (path.time.timeDeparted) {
          let count = data.get(path.center_code);
          if (count !== undefined) {
            data.set(path.center_code, {
              totalIncomingOrders: count.totalIncomingOrders,
              totalOutgoingOrders: count.totalOutgoingOrders + 1,
            });
          }
        }
      });
    });

    const result = centers.map((center) => {
      const center_code = center.center_code;
      const postalCode = center.postalCode;
      const { totalIncomingOrders, totalOutgoingOrders } =
        data.get(center_code);
      return {
        center_code,
        postalCode,
        totalIncomingOrders,
        totalOutgoingOrders,
      };
    });
    return {
      errorCode: 0,
      data: { packages: result, totalOrders: result.length },
      message: `Get all centers info successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getCollectionStatistics = async () => {
  try {
    const centers = await Center.find({ center_code: /^DTK/ })
      .select("center_code postalCode -_id")
      .sort({ postalCode: 1 });
    const data = new Map();
    centers.forEach((center) =>
      data.set(center.center_code, {
        totalIncomingOrders: 0,
        totalOutgoingOrders: 0,
      })
    );

    const allOrders = await Order.find({});
    allOrders.forEach((order) => {
      order.paths.forEach((path) => {
        if (path.time.timeArrived) {
          let count = data.get(path.center_code);
          if (count !== undefined) {
            data.set(path.center_code, {
              totalIncomingOrders: count.totalIncomingOrders + 1,
              totalOutgoingOrders: count.totalOutgoingOrders,
            });
          }
        }
        if (path.time.timeDeparted) {
          let count = data.get(path.center_code);
          if (count !== undefined) {
            data.set(path.center_code, {
              totalIncomingOrders: count.totalIncomingOrders,
              totalOutgoingOrders: count.totalOutgoingOrders + 1,
            });
          }
        }
      });
    });

    const result = centers.map((center) => {
      const center_code = center.center_code;
      const postalCode = center.postalCode;
      const { totalIncomingOrders, totalOutgoingOrders } =
        data.get(center_code);
      return {
        center_code,
        postalCode,
        totalIncomingOrders,
        totalOutgoingOrders,
      };
    });
    return {
      errorCode: 0,
      data: { packages: result, totalOrders: result.length },
      message: `Get all centers info successfully`,
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
  createNewCenter,
  getAllDGDs,
  getAllDTKs,
  getAllTDGDs,
  getAllTDTKs,
  getAllIncoming,
  getAllOutgoing,
  createNewManager,
  updateManager,
  deleteManager,
  getAllCentersInfo,
  getAllManager,
  getCollectionStatistics,
  getTransactionStatistics,
};
