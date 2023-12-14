import Order from "../models/Order";
import Center from "../models/Center";
import Shipment from "../models/Shipment";

const handleCreateOrder = async (req) => {
  const paths = [];
  const data = req.body;
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
  const receiverDGD_full_name = recipientInfo["address"];
  const senderDGD = req.user.center_name;
  const currentUser = req.user.user_name;
  // construting paths
  const paths_name = [senderDGD];
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
  // tìm điểm tập kết chứa địa chỉ gửi
  const allCenter = await Center.find();
  let senderDTK = "";
  for (let i = 0; i < allCenter.length; i++) {
    if (allCenter[i].name === senderDGD) {
      senderDTK = allCenter[i].parent_center_name;
      paths_name.push(allCenter[i].parent_center_name);
      break;
    }
  }

  // tìm điểm tập kết và điểm giao dịch chứa địa chỉ đến
  let receiverDTK = "";
  let receiverDGD = "";
  for (let i = 0; i < allCenter.length; i++) {
    if (allCenter[i].full_name === receiverDGD_full_name) {
      receiverDTK = allCenter[i].parent_center_name;
      receiverDGD = allCenter[i].name;
      break;
    }
  }

  // tìm điểm trung gian giữa hai điểm tập kết
  for (let i = 0; i < allCenter.length; i++) {
    const centerNames = allCenter[i].nearby_center.map(
      (item) => item.center_name
    );
    if (centerNames.includes(receiverDTK) && centerNames.includes(senderDTK)) {
      paths_name.push(allCenter[i].name);
      break;
    }
  }

  // thêm DTK và DGD nhận
  paths_name.push(receiverDTK);
  paths_name.push(receiverDGD);

  const path = {
    center_name: paths_name[0],
    user_name: currentUser,
    time: {
      timeArrived: currentTime,
    },
    isConfirmed: true,
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
  const centerInfo = await Center.findOne({ name: senderDGD });
  const updatedOrders = await Center.findOneAndUpdate(
    { name: senderDGD },
    { orders: [...centerInfo.orders, result._id] },
    { new: true }
  );
  if (result) {
    return {
      errorCode: 0,
      data: result,
      message: "Create order successfully",
    };
  }
  return {
    errorCode: 1,
    data: "",
    message: "Cannot create order",
  };
};

const handleVerifyShipment = async (req) => {
  // sửa order paths
  const currentCenter = req.user.center_name;
  const currentUser = req.user.user_name;
  const orderIDs = req.body.parcelIDs;
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
    const result = await Order.findOneAndUpdate(
      { parcelId: orderIDs[i] },
      order,
      {
        new: true,
      }
    );
  }

  return result;
};

const handleCreateShipment = async (req) => {
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

const handleGetResponsibleOrder = async (req) => {
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

const handleGetShipmentToCurrentCenter = async (req) => {
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

const handleGetAllDGD = async (req) => {
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

const handleGetParcelID = async (id) => {
  const result = await Order.findOne({ parcelId: id });

  if (result) {
    return {
      errorCode: 0,
      data: result,
      message: `Get parcel successfully`,
    };
  }
  return {
    errorCode: 1,
    data: "",
    message: `Cant get parcel id`,
  };
};

export {
  handleCreateOrder,
  handleVerifyShipment,
  handleGetResponsibleOrder,
  handleCreateShipment,
  handleGetAllDGD,
  handleGetParcelID,
  handleGetShipmentToCurrentCenter,
};
