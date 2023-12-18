import User from "../models/User";
const jwt = require("jsonwebtoken");
import Order from "../models/Order";

const createToken = (role_name, user_name, center_name) => {
  return jwt.sign(
    { role_name: role_name, user_name: user_name, center_name: center_name },
    process.env.SECRET
  );
};

const loginUser = async (user_name, password) => {
  try {
    const user = await User.findOne({
      user_name: user_name,
      password: password,
    });
    if (!user) {
      return {
        errorCode: 1,
        data: {},
        message: "Wrong username or password!",
      };
    }

    const token = createToken(user.role_name, user_name, user.center_name);
    return {
      errorCode: 0,
      data: {
        user_info: user,
        token,
      },
      message: "Login successfully",
    };
  } catch (error) {
    return {
      errorCode: -1,
      data: {},
      message: error.message,
    };
  }
};

const getParcelById = async (id) => {
  try {
    const result = await Order.findOne({ parcelId: id });
    if (result) {
      return {
        errorCode: 0,
        data: result,
        message: "Parcel is found successfully",
      };
    }
    return {
      errorCode: 1,
      data: {},
      message: "Parcel not found",
    };
  } catch (error) {
    return {
      error: -1,
      data: {},
      message: error.message,
    };
  }
};

const verifyUser = async (access_token) => {
  try {
    if (!access_token) {
      return {
        errorCode: 1,
        data: {},
        message: "Authorization token required",
      };
    }

    const { role_name } = jwt.verify(
      access_token.split(" ")[1],
      process.env.SECRET
    );
    return {
      errorCode: 0,
      data: role_name,
      message: "User verified successfully",
    };
  } catch (error) {
    console.log(error.message);
    return {
      errorCode: 1,
      data: {},
      message: error.message,
    };
  }
};

export { loginUser, getParcelById, verifyUser };
