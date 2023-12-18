import Order from "../models/Order";
import Center from "../models/Center";
import Shipment from "../models/Shipment";

const confirmShipment = async () => {
  // sửa order paths
  const currentCenter = req.user.center_name;
  const currentUser = req.user.user_name;
  const orderIDs = req.body.parcelIDs;
  console.log(orderIDs, currentCenter, currentUser);
  for (let i = 0; i < orderIDs.length; i++) {
    const order = await Order.findOne({ parcelId: orderIDs[i] });
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
    for (let i = 0; i < order["paths"].length; i++) {
      if (order["paths"][i]["center_name"] == currentCenter) {
        order["paths"][i]["user_name"] = currentUser;
        order["paths"][i]["time"]["timeArrived"] = currentTime;
      }
    }
    await Order.findOneAndUpdate({ parcelId: orderIDs[i] }, order, {
      new: true,
    });
  }

  return "result";
};

const getAllTransactionAndCollectionsCenter = async () => {
  const currentCenter = req.user.center_name;
  const user_name = req.user.user_name;
  const regex = /^DGD/;
  const query = { name: { $regex: regex } };

  const result = await Center.find(query, { name: 1, full_name: 1, _id: 0 });

  if (result) {
    return {
      errorCode: 0,
      data: result,
      message: `Load all locations successfully`,
    };
  }
  return {
    errorCode: 1,
    data: "",
    message: `Cant all locations successfully`,
  };
};

const getResponsibleOrders = async () => {
  let result = [];
  const currentCenter = req.user.center_name;
  const user_name = req.user.user_name;
  const allOrders = await Order.find();
  for (let i = 0; i < allOrders.length; i++) {
    const path = allOrders[i]["paths"];
    for (let j = 0; j < path.length - 1; j++) {
      if (
        path[j]["user_name"] === user_name &&
        path[j]["center_name"] === currentCenter &&
        path[j + 1]["user_name"] === null
      ) {
        result.push({
          parcelID: allOrders[i]["parcelId"],
          expectedCenter: path[j + 1]["center_name"],
        });
      }
    }
  }

  if (result) {
    return {
      errorCode: 0,
      data: result,
      message: `Load all parcel responsible by ${user_name} in ${currentCenter} successfully`,
    };
  }
  return {
    errorCode: 1,
    data: "",
    message: `Can't load all parcel responsible by ${user_name} in ${currentCenter}`,
  };
};

const createShipmentToNextCenter = async () => {
  const currentCenter = req.user.center_name;
  const user_name = req.user.user_name;
  let data = req.body;
  data.start.center_id = currentCenter;
  data.user_id = user_name;
  const result = await Shipment.create(data);
  const parcelIDs = req.body.start.orders;
  for (let i = 0; i < parcelIDs.length; i++) {
    const order = await Order.findOne({ parcelId: parcelIDs[i] });
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
    for (let i = 0; i < order["paths"].length; i++) {
      if (order["paths"][i]["center_name"] == currentCenter) {
        order["paths"][i]["time"]["timeDeparted"] = currentTime;
        order["paths"][i]["isSent"] = true;
      }
    }
    await Order.findOneAndUpdate({ parcelId: parcelIDs[i] }, order, {
      new: true,
    });
  }

  if (result) {
    return {
      errorCode: 0,
      data: "result",
      message: `Create shipment to ${data["destination"]["center_id"]} successfully`,
    };
  }

  return {
    errorCode: 1,
    data: `Can't create shipment to ${data["destination"]["center_id"]}`,
  };
};

const getIncomingShipments = async () => {
  let result = [];
  const currentCenter = req.user.center_name;
  const user_name = req.user.user_name;
  const allShipment = await Shipment.find();
  for (let i = 0; i < allShipment.length; i++) {
    if (allShipment[i].destination.center_id === currentCenter) {
      result.push(allShipment[i].start.orders);
    }
  }

  if (result) {
    return {
      errorCode: 0,
      data: result,
      message: `Load all parcel come to ${currentCenter} successfully`,
    };
  }
  return {
    errorCode: 1,
    data: "",
    message: `Can't load all parcel come to ${currentCenter}`,
  };
};

export {
  confirmShipment,
  getAllTransactionAndCollectionsCenter,
  getResponsibleOrders,
  createShipmentToNextCenter,
  getIncomingShipments,
};
