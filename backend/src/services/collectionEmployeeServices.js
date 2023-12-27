import Order from "../models/Order";
import Center from "../models/Center";
import Shipment from "../models/Shipment";

const getCurrentTime = () => {
  let date = new Date();
  const month = date.toLocaleString("en-US", { month: "long" });
  const time = date.toLocaleTimeString(["en-US"], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${time}, ${month} ${day}, ${year}`;
};

const getIncomingCollectionOrder = async (user, query) => {
  const isCollectionHub = (center_code) => {
    return center_code.split("_")[0] === "DTK";
  };

  try {
    const { center_name: currentCenter } = user;
    const allOrders = await Order.find({});
    let result = [];
    const collectionHubs = [];
    allOrders.forEach((order) => {
      for (let index = 1; index < order.paths.length; index++) {
        if (order.paths[index].center_code === currentCenter) {
          const prevCenter = order.paths[index - 1];
          if (isCollectionHub(prevCenter.center_code)) {
            if (
              prevCenter.isConfirmed &&
              prevCenter.time.timeArrived &&
              prevCenter.time.timeDeparted &&
              prevCenter.user_name &&
              !order.paths[index].user_name &&
              !order.paths[index].isConfirmed &&
              !order.paths[index].time.timeArrived
            ) {
              result.push({
                parcelId: order.parcelId,
                typeOfParcel: order.packageInfo.typeOfParcel,
                sourceCenter: prevCenter.center_code,
                pendingFrom: prevCenter.time.timeDeparted,
              });
              collectionHubs.push(prevCenter.center_code);
            }
          }
        }
      }
    });

    if (query?.sort === "Date (asc)") {
      result.sort(function compareDates(order1, order2) {
        const date1 = new Date(order1.pendingFrom);
        const date2 = new Date(order2.pendingFrom);
        return date1 > date2 ? 1 : date1 < date2 ? -1 : 0;
      });
    } else if (query?.sort === "Date (desc)") {
      result.sort(function compareDates(order1, order2) {
        const date1 = new Date(order1.pendingFrom);
        const date2 = new Date(order2.pendingFrom);
        return date1 < date2 ? 1 : date1 > date2 ? -1 : 0;
      });
    }
    if (query?.collectionHubs?.length > 0) {
      result = result.filter((order) =>
        query.collectionHubs?.includes(order.sourceCenter)
      );
    }
    return {
      errorCode: 0,
      data: {
        packages: result,
        totalOrders: result.length,
        collectionHubs: [...new Set(collectionHubs)],
      },
      message: `Load total ${result.length} parcels come to ${currentCenter} successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const confirmIncomingCollectionOrder = async (parcelId, user) => {
  try {
    const { center_name: currentCenter, user_name: currentUser } = user;
    const order = await Order.findOne({ parcelId: parcelId });
    const currentTime = getCurrentTime();
    for (let i = 0; i < order["paths"].length; i++) {
      if (order["paths"][i]["center_code"] == currentCenter) {
        order["paths"][i]["user_name"] = currentUser;
        order["paths"][i]["time"]["timeArrived"] = currentTime;
        order["paths"][i].isConfirmed = true;
      }
    }
    const result = await Order.findOneAndUpdate({ parcelId: parcelId }, order, {
      new: true,
    });
    return {
      errorCode: 0,
      data: result,
      message: "Confirm order successfully!",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getNearbyCollectionHubs = async (user) => {
  try {
    const { center_name: currentCenter } = user;
    const center = await Center.findOne({ center_code: currentCenter });
    if (!center) {
      return {
        errorCode: 1,
        data: {},
        message: "Invalid center code!",
      };
    }
    const collectionHubs = [];
    center.nearby_center?.forEach((element) => {
      if (element.split("_")[0] === "DTK") {
        collectionHubs.push(element);
      }
    });
    return {
      errorCode: 0,
      data: collectionHubs,
      message: "Get all nearby collection hubs successfully",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getOrdersToTransferCollection = async (user) => {
  try {
    const { center_name: currentCenter, user_name } = user;
    const orders = await Order.find({});
    const result = [];
    orders.forEach((order) => {
      const paths = order.paths;
      for (let i = 1; i < paths.length - 1; i++) {
        if (
          paths[i].center_code === currentCenter &&
          paths[i].isConfirmed &&
          paths[i].user_name === user_name &&
          paths[i].time.timeArrived &&
          !paths[i].time.timeDeparted
        ) {
          if (paths[i + 1].center_code.split("_")[0] === "DTK") {
            result.push({
              id: order.parcelId,
              nextCenter: paths[i + 1].center_code,
            });
          }
        }
      }
    });
    return {
      errorCode: 0,
      data: result,
      message:
        "Get all orders to transfer to next collection hub successfully!",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const transferOrdersToCollectionHub = async (parcelIds, nextCenter, user) => {
  try {
    const { center_name: currentCenter, user_name: currentUser } = user;
    const orders = await Order.find({
      parcelId: { $in: parcelIds },
    });
    // update paths
    let count = 0;
    for (let i = 0; i < orders.length; i++) {
      for (let index = 0; index < orders[i].paths.length; index++) {
        if (
          orders[i].paths[index].center_code === currentCenter &&
          orders[i].paths[index].isConfirmed === true &&
          orders[i].paths[index].user_name === currentUser &&
          orders[i].paths[index]["time"].timeArrived &&
          !orders[i].paths[index]["time"].timeDeparted
        ) {
          orders[i].paths[index]["time"].timeDeparted = getCurrentTime();
          count++;
        }
      }

      const result = await Order.findOneAndUpdate(
        { parcelId: orders[i].parcelId },
        orders[i],
        {
          new: true,
        }
      );
    }

    return {
      errorCode: 0,
      data: {},
      message: `Transfer ${count} parcels successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getIncomingTransactionOrder = async (user, query) => {
  const isTransactionHub = (center_code) => {
    return center_code.split("_")[0] === "DGD";
  };

  try {
    const { center_name: currentCenter } = user;
    const allOrders = await Order.find({}).sort({ parcelId: 1 });
    let result = [];
    const transactionHubs = [];
    allOrders.forEach((order) => {
      for (let index = 1; index < order.paths.length; index++) {
        if (order.paths[index].center_code === currentCenter) {
          const prevCenter = order.paths[index - 1];
          if (isTransactionHub(prevCenter.center_code)) {
            if (
              prevCenter.isConfirmed &&
              prevCenter.time.timeArrived &&
              prevCenter.time.timeDeparted &&
              prevCenter.user_name &&
              !order.paths[index].user_name &&
              !order.paths[index].isConfirmed &&
              !order.paths[index].time.timeArrived
            ) {
              result.push({
                parcelId: order.parcelId,
                typeOfParcel: order.packageInfo.typeOfParcel,
                sourceCenter: prevCenter.center_code,
                pendingFrom: prevCenter.time.timeDeparted,
              });
              transactionHubs.push(prevCenter.center_code);
            }
          }
        }
      }
    });

    if (query?.sort === "Date (asc)") {
      result.sort(function compareDates(order1, order2) {
        const date1 = new Date(order1.pendingFrom);
        const date2 = new Date(order2.pendingFrom);
        return date1 > date2 ? 1 : date1 < date2 ? -1 : 0;
      });
    } else if (query?.sort === "Date (desc)") {
      result.sort(function compareDates(order1, order2) {
        const date1 = new Date(order1.pendingFrom);
        const date2 = new Date(order2.pendingFrom);
        return date1 < date2 ? 1 : date1 > date2 ? -1 : 0;
      });
    }
    if (query?.transactionHubs?.length > 0) {
      result = result.filter((order) =>
        query.transactionHubs?.includes(order.sourceCenter)
      );
    }
    return {
      errorCode: 0,
      data: {
        packages: result,
        totalOrders: result.length,
        transactionHubs: [...new Set(transactionHubs)],
      },
      message: `Load total ${result.length} parcels come to ${currentCenter} successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const confirmIncomingTransactionOrder = async (parcelId, user) => {
  try {
    const { center_name: currentCenter, user_name: currentUser } = user;
    const order = await Order.findOne({ parcelId: parcelId });
    const currentTime = getCurrentTime();
    for (let i = 0; i < order["paths"].length; i++) {
      if (order["paths"][i]["center_code"] == currentCenter) {
        order["paths"][i]["user_name"] = currentUser;
        order["paths"][i]["time"]["timeArrived"] = currentTime;
        order["paths"][i].isConfirmed = true;
      }
    }
    const result = await Order.findOneAndUpdate({ parcelId: parcelId }, order, {
      new: true,
    });
    return {
      errorCode: 0,
      data: result,
      message: "Confirm order successfully!",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getOrdersToTransferTransaction = async (user) => {
  try {
    const { center_name: currentCenter, user_name } = user;
    const orders = await Order.find({});
    const result = [];
    orders.forEach((order) => {
      const paths = order.paths;
      for (let i = 1; i < paths.length - 1; i++) {
        if (
          paths[i].center_code === currentCenter &&
          paths[i].isConfirmed &&
          paths[i].user_name === user_name &&
          paths[i].time.timeArrived &&
          !paths[i].time.timeDeparted
        ) {
          if (paths[i + 1].center_code.split("_")[0] === "DGD") {
            result.push({
              id: order.parcelId,
              nextCenter: paths[i + 1].center_code,
            });
          }
        }
      }
    });
    return {
      errorCode: 0,
      data: result,
      message:
        "Get all orders to transfer to next transaction hub successfully!",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const transferOrdersToTransactionHub = async (parcelIds, nextCenter, user) => {
  try {
    const { center_name: currentCenter, user_name: currentUser } = user;
    const orders = await Order.find({
      parcelId: { $in: parcelIds },
    });
    // update paths
    let count = 0;
    for (let i = 0; i < orders.length; i++) {
      for (let index = 0; index < orders[i].paths.length; index++) {
        if (
          orders[i].paths[index].center_code === currentCenter &&
          orders[i].paths[index].isConfirmed === true &&
          orders[i].paths[index].user_name === currentUser &&
          orders[i].paths[index]["time"].timeArrived &&
          !orders[i].paths[index]["time"].timeDeparted
        ) {
          orders[i].paths[index]["time"].timeDeparted = getCurrentTime();
          count++;
          break;
        }
      }

      const result = await Order.findOneAndUpdate(
        { parcelId: orders[i].parcelId },
        orders[i],
        {
          new: true,
        }
      );
    }

    return {
      errorCode: 0,
      data: {},
      message: `Transfer ${count} parcels successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getNearbyTransactionHubs = async (user) => {
  try {
    const { center_name: currentCenter } = user;
    const center = await Center.findOne({ center_code: currentCenter });
    if (!center) {
      return {
        errorCode: 1,
        data: {},
        message: "Invalid center code!",
      };
    }
    const transactionHubs = [];
    center.nearby_center?.forEach((element) => {
      if (element.split("_")[0] === "DGD") {
        transactionHubs.push(element);
      }
    });
    return {
      errorCode: 0,
      data: transactionHubs,
      message: "Get all nearby transaction hubs successfully",
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
  getIncomingCollectionOrder,
  confirmIncomingCollectionOrder,
  getNearbyTransactionHubs,
  getNearbyCollectionHubs,
  getOrdersToTransferCollection,
  transferOrdersToCollectionHub,
  getIncomingTransactionOrder,
  confirmIncomingTransactionOrder,
  getOrdersToTransferTransaction,
  transferOrdersToTransactionHub,
};
