import Order from "../models/Order";
import Center from "../models/Center";
import Shipment from "../models/Shipment";
import _ from "lodash";

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

const createOrder = async (data, user) => {
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

    const result = await Center.find(
      query,
      {
        center_code: 1,
        name: 1,
        postalCode: 1,
        _id: 0,
      },
      { sort: { postalCode: 1 } }
    );

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
      nextCenter: center?.nearby_center[0] ?? null,
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

const getIncomingOrdersToConfirm = async (user, query) => {
  try {
    const { center_name: currentCenter } = user;
    const allOrders = await Order.find({}).sort({ parcelId: 1 });
    let result = [];

    allOrders.forEach((order) => {
      if (
        order.paths.length > 1 &&
        order.paths[order.paths.length - 1].center_code === currentCenter &&
        order.paths[order.paths.length - 1].user_name === null &&
        !order.paths[order.paths.length - 1].isConfirmed &&
        !order.paths[order.paths.length - 1].time.timeArrived &&
        order.paths[order.paths.length - 2].user_name !== null &&
        order.paths[order.paths.length - 2].isConfirmed === true &&
        order.paths[order.paths.length - 2].time.timeArrived &&
        order.paths[order.paths.length - 2].time.timeDeparted
      ) {
        result.push({
          parcelId: order.parcelId,
          typeOfParcel: order.packageInfo.typeOfParcel,
          sourceCenter: order.paths[order.paths.length - 2].center_code,
          pendingFrom: order.paths[order.paths.length - 2].time.timeDeparted,
          notes: order.packageInfo.notes,
        });
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

    if (query?.parcelType && query.parcelType !== "Both") {
      result = result.filter((order) => {
        const parcelType = order.typeOfParcel?.isDocument
          ? "Document"
          : "Package";
        return parcelType === query.parcelType;
      });
    }
    return {
      errorCode: 0,
      data: { packages: result },
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
  try {
    const { center_name: currentCenter, user_name: currentUser } = user;
    const order = await Order.findOne({ parcelId });
    // update paths
    if (!order) {
      return {
        errorCode: 1,
        data: {},
        message: "Confirm unsuccessfully. Parcel not found!",
      };
    }
    for (let index = 0; index < order.paths.length; index++) {
      if (order.paths[index].center_code === currentCenter) {
        order.paths[index].user_name = currentUser;
        order.paths[index].time.timeArrived = getCurrentTime();
        order.paths[index].isConfirmed = true;
      }
    }

    const result = await Order.findOneAndUpdate({ parcelId: parcelId }, order, {
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

const getAllOrderToShip = async (user, query) => {
  try {
    const { center_name: currentCenter, user_name } = user;
    const allOrders = await Order.find({}).sort({ parcelId: 1 });
    let result = [];

    allOrders.forEach((order) => {
      if (
        order.paths.length > 0 &&
        order.paths[order.paths.length - 1].center_code === currentCenter &&
        order.paths[order.paths.length - 1].user_name === user_name &&
        order.paths[order.paths.length - 1].isConfirmed === true &&
        order.paths[order.paths.length - 1].time.timeArrived &&
        !order.paths[order.paths.length - 1].time.timeDeparted
      ) {
        result.push({
          parcelId: order.parcelId,
          typeOfParcel: order.packageInfo.typeOfParcel,
          recipientAddress: order.packageInfo.recipientInfo.nameAddress,
          phoneNum: order.packageInfo.recipientInfo.phoneNum,
          pendingFrom:
            order.paths.length > 1
              ? order.paths[order.paths.length - 2].time.timeDeparted
              : order.paths[order.paths.length - 1].time.timeArrived,
          service: order.packageInfo.additionalService,
        });
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

    if (query?.parcelType && query.parcelType !== "Both") {
      result = result.filter((order) => {
        const parcelType = order.typeOfParcel?.isDocument
          ? "Document"
          : "Package";
        return parcelType === query.parcelType;
      });
    }

    return {
      errorCode: 0,
      data: { packages: result },
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
      shipment.timeDelivered = getCurrentTime();
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

// gop thanh 1
const getStatsOrders = async (user) => {
  try {
    const user_name = user.user_name;
    const allShipments = await Shipment.find();
    let successOrders = 0;
    let unsuccessOrders = 0;
    for (let i = 0; i < allShipments.length; i++) {
      if (
        allShipments[i].user_name === user_name &&
        allShipments[i].status === "Delivered successfully"
      ) {
        successOrders += 1;
      } else if (
        allShipments[i].user_name === user_name &&
        allShipments[i].status === "Deliverd unsuccessfully"
      ) {
        unsuccessOrders += 1;
      }
    }
    return {
      errorCode: 0,
      data: {
        no_of_success: successOrders,
        no_of_unsuccess: unsuccessOrders,
      },
      message: `Get order successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getAllIncomingAndOutGoing = async (user) => {
  try {
    const user_name = user.user_name;
    const allOrder = await Order.find();
    let totalInAndOut = 0;
    for (let i = 0; i < allOrder.length; i++) {
      const paths = allOrder[i].paths;
      for (let j = 0; j < paths.length; j++) {
        if (
          paths[j].user_name == user_name &&
          (paths[j].time.timeArrived != "" || paths[j].time.timeDeparted != "")
        ) {
          totalInAndOut += 1;
        }
      }
    }
    return {
      errorCode: 0,
      data: {
        total_in_out: totalInAndOut,
      },
      message: `Get all incoming and outgoing order by ${user} successfully`,
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getAllRecipientShipment = async (user, query) => {
  try {
    const { user_name } = user;
    const allShipments = await Shipment.find({ user_name: user_name }).sort({
      parcelId: 1,
    });
    let result = [];
    for (let index = 0; index < allShipments.length; index++) {
      const shipment = allShipments[index];
      const order = await Order.findOne({ parcelId: shipment.parcelId });
      result.push({
        parcelId: shipment.parcelId,
        recipientNameAddress: order.packageInfo.recipientInfo.nameAddress,
        typeOfParcel: order.packageInfo.typeOfParcel,
        pendingFrom: order.paths[order.paths.length - 1].time.timeDeparted,
        status: shipment.status,
        deliveredAt: shipment.timeDelivered,
      });
    }
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

    if (query?.status?.length > 0) {
      result = result.filter((shipment) =>
        query.status?.includes(shipment.status)
      );
    }

    return {
      errorCode: 0,
      data: { packages: result },
      message: "Get all shipments successfully",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getContribution = async (user) => {
  try {
    const { center_name: center, user_name } = user;
    const result = await Order.find({ "paths.center_code": center });
    let count = 0;
    result.forEach((order) => {
      order.paths.forEach((path) => {
        if (path.center_code === center && path.user_name === user_name) {
          count += 1;
        }
      });
    });
    return {
      errorCode: 0,
      data: {
        contribution: count,
        total: result.length,
      },
      message: "Get your contribution successfully!",
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
  getAllRecipientShipment,
  getStatsOrders,
  getAllIncomingAndOutGoing, getContribution
};
