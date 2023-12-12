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

const handleCreateShipment = async (data) => {
  const result = await Shipment.create(data);
  if (result) {
    return {
      errorCode: 0,
      data: `Create shipment to ${data["destination"]["center_id"]} successfully`,
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

export {
  handleCreateOrder,
  handleVerifyShipment,
  handleGetResponsibleOrder,
  handleCreateShipment,
  handleGetAllDGD,
};
