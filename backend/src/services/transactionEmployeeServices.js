import Order from "../models/Order";
import Center from "../models/Center";
import Shipment from "../models/Shipment";
import _ from "lodash";

const createOrder = async (data, user) => {
  const getCurrentTime = () => {
    const currentdate = new Date();
    const currentTime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    return currentTime;
  };

  const bfs = (allCenters, source, dest) => {
    let adjacencyGraph = new Map();
    let visited = new Map();
    let path = new Map();
    allCenters?.forEach((center) => {
      adjacencyGraph.set(center.center_code, center.nearby_center);
      visited.set(center.center_code, false);
    });

    let queue = [source];
    visited.set(source, true);
    while (queue.length) {
      const node = queue.shift();
      if (node === dest) break;
      adjacencyGraph.get(node)?.forEach((neighbour) => {
        if (!visited.get(neighbour)) {
          queue.push(neighbour);
          visited.set(neighbour, true);
          path.set(neighbour, node);
        }
      });
    }
    if (!visited.get(dest)) return [];

    let route = [];
    let tranverseNode = dest;
    while (tranverseNode !== source) {
      route.push(tranverseNode);
      tranverseNode = path.get(tranverseNode);
    }
    route.push(tranverseNode);
    return route.reverse();
  };

  const getPathFromSourceToDestCenter = async (source, dest) => {
    try {
      const allCenters = await Center.find({}).select({
        center_code: 1,
        nearby_center: 1,
        _id: 0,
      });
      const route = bfs(allCenters, source, dest);
      return route;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };
  try {
    const recipientAddress = data.packageInfo.recipientInfo["address"];
    const { center_name: senderAddress, user_name: currentUser } = user;
    const route = await getPathFromSourceToDestCenter(
      senderAddress,
      recipientAddress
    );

    if (route.length === 0) {
      return {
        errorCode: 1,
        data: {},
        message: "Can't find the appropriate route for source and dest center",
      };
    }

    const paths = route.map((center, index) => {
      if (index === 0) {
        return {
          center_code: center,
          user_name: currentUser,
          time: {
            timeArrived: getCurrentTime(),
          },
          isConfirmed: true,
        };
      } else {
        return {
          center_code: center,
        };
      }
    });
    data["paths"] = paths;
    const result = await Order.create(data);
    return {
      errorCode: 0,
      data: result,
      message: "Create order successfully",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getAllTransactionPoints = async () => {
  try {
    const regex = /^DGD/;
    const query = { name: { $regex: regex } };

    const result = await Center.find(query, {
      center_code: 1,
      name: 1,
      _id: 0,
    });

    return {
      errorCode: 0,
      data: result,
      message: `Get all transaction locations successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getOrdersToCollectionHub = async (user) => {
  try {
    // get orders confirmed by the current user to transfer to the collection hub
    const { center_name: currentCenter, user_name } = user;
    const allOrders = await Order.find({});
    const result = allOrders.filter((order) => {
      return (
        order.paths[0].user_name === user_name &&
        order.paths[0].center_code === currentCenter &&
        order.paths[0].time.timeArrived &&
        !order.paths[0].time.timeDeparted &&
        order.paths[0].isConfirmed === true &&
        order.paths.length > 1
      );
    });

    const center = await Center.findOne({ center_code: currentCenter });
    const data = {
      parcelIds: result.map((order) => order.parcelId),
      nextCenter: center.nearby_center[0],
    };
    return {
      errorCode: 0,
      data: data,
      message: `Load all parcel responsible by ${user_name} in ${currentCenter} successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const transferOrdersToCollectionHub = async (parcelIds, user) => {
  const getCurrentTime = () => {
    const currentdate = new Date();
    const currentTime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    return currentTime;
  };

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

const getIncomingOrdersToConfirm = async (user) => {
  try {
    const { center_name: currentCenter } = user;
    const allOrders = await Order.find({});
    const result = allOrders.filter(
      (order) =>
        order.paths.length > 1 &&
        order.paths[order.paths.length - 1].center_code === currentCenter &&
        order.paths[order.paths.length - 1].user_name === null &&
        order.paths[order.paths.length - 2].user_name !== null &&
        order.paths[order.paths.length - 2].isConfirmed === true &&
        order.paths[order.paths.length - 2].time.timeArrived !== null &&
        order.paths[order.paths.length - 2].time.timeDeparted !== null
    );

    return {
      errorCode: 0,
      data: result,
      message: `Load all parcels come to ${currentCenter} successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const confirmOrderFromCollectionHub = async (parcelId, user) => {
  const getCurrentTime = () => {
    const currentdate = new Date();
    const currentTime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    return currentTime;
  };
  try {
    const { center_name: currentCenter, user_name: currentUser } =
      user.center_name;
    const order = await Order.findOne({ parcelId });
    // update paths
    if (!order) {
      return {
        errorCode: 1,
        data: {},
        message: "Confirm unsuccessfully. Parcel not found!",
      };
    }
    const newPaths = order.paths.map((path, index) => {
      if (path.center_code === currentCenter) {
        path.user_name = currentUser;
        path.time.timeArrived = getCurrentTime();
        path.isConfirmed = true;
      }
      return path;
    });
    order.paths = newPaths;
    const result = await Order.findOneAndUpdate({ parcelId }, order, {
      new: true,
    });

    return {
      errorCode: 0,
      data: result,
      message: `Confirm order ${parcelId} successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getAllOrderToShip = async (user) => {
  try {
    const { center_name: currentCenter, user_name } = user;
    const allOrders = await Order.find({});
    const result = allOrders.filter(
      (order) =>
        order.paths[order.paths.length - 1].center_code === currentCenter &&
        order.paths[order.paths.length - 1].user_name === user_name &&
        order.paths[order.paths.length - 1].isConfirmed === true &&
        order.paths[order.paths.length - 1].time.timeArrived !== null
    );

    return {
      errorCode: 0,
      data: result,
      message: `Load all parcels ready to ship of ${currentCenter} center successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};
const createShipmentToRecipient = async (user, parcelId) => {
  try {
    const getCurrentTime = () => {
      const currentdate = new Date();
      const currentTime =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      return currentTime;
    };
    const { center_name: currentCenter, user_name } = user;
    const order = await Order.findOne({ parcelId: parcelId });
    if (!order) {
      return {
        errorCode: 1,
        data: {},
        message: "Create shipment unsuccessfully. Parcel not found!",
      };
    }

    const newShipment = await Shipment.create({
      user_name: user_name,
      dispatchedCenter: currentCenter,
      parcelId: parcelId,
    });

    order.paths[order.paths.length - 1].time.timeDeparted = getCurrentTime();

    await Order.findOneAndUpdate({ parcelId: parcelId }, order, {
      new: true,
    });

    return {
      errorCode: 0,
      data: newShipment,
      message: `Create shipment to recipient successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const confirmRecipientShipment = async (parcelId, status) => {
  try {
    const getCurrentTime = () => {
      const currentdate = new Date();
      const currentTime =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      return currentTime;
    };
    const shipment = await Shipment.findOne({ parcelId });
    if (!shipment) {
      return {
        errorCode: 1,
        data: {},
        message: "Confirm shipment unsuccessfully. Shipment not found!",
      };
    }
    if (status === "Delivered successfully") {
      shipment.timeDelivered = getCurrentTime();
      shipment.status = status;
      const order = await Order.findOne({ parcelId: parcelId });
      let newOrder = _.cloneDeep(order);
      newOrder.delivered = true;
      await Order.findOneAndUpdate({ parcelId: parcelId }, newOrder, {
        new: true,
      });
    } else if (status === "Deliverd unsuccessfully") {
      shipment.status = status;
    }
    const result = await Shipment.findOneAndUpdate({ parcelId }, shipment, {
      new: true,
    });
    return {
      errorCode: 0,
      data: result,
      message: `Update shipment ${parcelId} successfully`,
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
  createOrder,
  confirmOrderFromCollectionHub,
  getAllTransactionPoints,
  getOrdersToCollectionHub,
  createShipmentToRecipient,
  getIncomingOrdersToConfirm,
  transferOrdersToCollectionHub,
  confirmRecipientShipment,
  getAllOrderToShip,
};
