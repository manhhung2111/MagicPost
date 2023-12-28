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

export {
  createNewCenter,
  getAllDGDs,
  getAllDTKs,
  getAllTDGDs,
  getAllTDTKs,
  getAllIncoming,
  getAllOutgoing,
};
