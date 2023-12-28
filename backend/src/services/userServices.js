import User from "../models/User";
import Order from "../models/Order";
import Center from "../models/Center";
import _ from "lodash";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (role_name, user_name, center_name) => {
  return jwt.sign(
    { role_name: role_name, user_name: user_name, center_name: center_name },
    process.env.SECRET
  );
};

const loginUser = async (user_name, password) => {
  try {
    if (!user_name || !password) {
      throw Error("All fields must be filled");
    }

    const user = await User.findOne({ user_name: user_name });
    if (!user) {
      throw Error("Incorrect username");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect password");
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
    let result = await Order.findOne({ parcelId: id });
    if (!result) {
      return {
        errorCode: 1,
        data: {},
        message: "Parcel not found",
      };
    }
    const centers = [];
    for (let i = 0; i < result.paths.length; i++) {
      const center = await Center.findOne({
        center_code: result.paths[i].center_code,
      });
      centers.push(center.name);
    }
    return {
      errorCode: 0,
      data: { parcel: result, centers },
      message: "Parcel is found successfully",
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
