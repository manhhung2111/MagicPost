import Order from "../models/Order";
import Center from "../models/Center";
import Shipment from "../models/Shipment";

const handleCreateOrder = async (data) => {
  const paths = [];
  const {
    senderInfo,
    recipientInfo,
    additionalService,
    sender_instruction,
    notes,
    deliveryFare,
    weight,
    recipientFare,
  } = data.packageInfo;
  const receiver_location = recipientInfo["address"];
  const receiverCenter = "GD1";
  const currentUser = "GD1_V";
  // construting paths
  const paths_name = [receiverCenter];
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
  // tìm điểm giao dịch chứa địa chỉ đến
  const allCenter = await Center.find();
  let destCenter = null;
  for (let i = 0; i < allCenter.length; i++) {
    const responsible_location = allCenter[i]["responsible_locations"];
    if (allCenter[i]["name"] == receiverCenter) {
      paths_name.push(allCenter[i]["parent_center_name"]);
    }
    if (
      responsible_location.length > 0 &&
      responsible_location.indexOf(receiver_location) !== -1
    ) {
      paths_name.push(allCenter[i]["parent_center_name"]);
      paths_name.push(allCenter[i]["name"]);
    }
  }
  const path = {
    center_name: paths_name[0],
    user_name: currentUser,
    time: {
      timeArrived: currentTime,
    },
  };
  paths.push(path);
  for (let i = 1; i < paths_name.length; i++) {
    const tmp_path = {
      center_name: paths_name[i],
      user_name: null,
      time: null,
    };
    paths.push(tmp_path);
  }
  data["paths"] = paths;
  const result = await Order.create(data);
  const centerInfo = await Center.findOne({ name: receiverCenter });
  const updatedOrders = await Center.findOneAndUpdate(
    { name: receiverCenter },
    { orders: [...centerInfo.orders, result._id] },
    { new: true }
  );
  return {
    errorCode: 0,
    data: result,
    message: "Create order successfully",
  };
};

const handleVerifyShipment = async (data) => {
  // sửa order paths
  const currentCenter = "TK1";
  const orderID = "65576a7be6f62d1f2d6d9be2";
  const currentUser = "TK1_V";
  const order = await Order.findOne({ _id: orderID });
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
  console.log(order);
  for (let i = 0; i < order["paths"].length; i++) {
    if (order["paths"][i]["center_name"] == currentCenter) {
      order["paths"][i]["user_name"] = currentUser;
      order["paths"][i]["time"]["timeArrived"] = currentTime;
    }
  }
  const result = await Order.findOneAndUpdate({ _id: orderID }, order, {
    new: true,
  });

  return result;
};

const handleGetAllResponsibleLocations = async () => {
  const allCenter = await Center.find();
  let allResponsibleLocations = [];
  for (let i = 0; i < allCenter.length; i++) {
    const responsible_location = allCenter[i]["responsible_locations"];
    if (responsible_location.length > 0) {
      allResponsibleLocations.push(...responsible_location);
    }
  }
  if (allResponsibleLocations) {
    return {
      errorCode: 0,
      data: allResponsibleLocations,
      message: "Locations found successfully",
    };
  }
  return {
    errorCode: 1,
    data: [],
    message: "LOcations not found",
  };
};

const handleCreateShipment = async (data) => {
  const result = await Shipment.create(data);
  if (result) {
    return {
      errorCode: 0,
      data : `Create shipment to ${data["destination"]["center_id"]} successfully`,
    };
  }
};

const handleGetResponsibleOrder = async () => {
  let result = [];
  const currentCenter = "GD1";
  const user_name = "GD1_V";
  const allOrders = await Order.find();
  for (let i = 0; i < allOrders.length; i++) {
    const path = allOrders[i]["paths"];
    for (let j = 0; j < path.length; j++) {
      if (
        path[j]["user_name"] === user_name &&
        path[j]["center_name"] === currentCenter
      ) {
        result.push(allOrders[i]["parcelId"]);
      }
    }
  }
  
  return {
    errorCode: 0,
    data: result,
    message: `Load all parcel responsible by ${user_name} in ${currentCenter} successfully`,
  };
};

export {
  handleCreateOrder,
  handleVerifyShipment,
  handleGetAllResponsibleLocations,
  handleGetResponsibleOrder,
  handleCreateShipment
};
