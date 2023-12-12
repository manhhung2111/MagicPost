import { userLogin } from "../services/userServices";

const jwt = require("jsonwebtoken");

const createToken = (role_name, user_name, center_name) => {
  return jwt.sign(
    { role_name: role_name, user_name: user_name, center_name: center_name },
    process.env.SECRET,
    { expiresIn: "3d" }
  );
};

const handleUserLogin = async (req, res) => {
  const { user_name, password } = req.body;
  try {
    const user = await userLogin(user_name, password);
    const token = createToken(user.role_name, user_name, user.center_name);

    return res.status(200).json({
      errorCode: 0,
      data: {
        user_info: user,
        token,
      },
      message: "Login successfully",
    });
  } catch (error) {
    res.status(400).json({
      errorCode: 1,
      data: "",
      message: error.message,
    });
  }
};

const handleGetParcelID = async (id) => {
  const result = await Order.findOne({ parcelId: id });
  if (result) {
    return {
      errorCode: 0,
      data: result,
      message: "Parcel found successfully",
    };
  }
  return {
    errorCode: 1,
    data: [],
    message: "Parcel not found",
  };
};

export { handleUserLogin, handleGetParcelID };
