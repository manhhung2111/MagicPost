import User from "../models/User";

const handleLogin = async (data) => {
  const result = await User.findOne({
    user_name: data.username,
    password: data.password,
  });
  if (result) {
    return {
      errorCode: 0,
      data: result,
      message: `Login successfully`,
    };
  }
  return {
    errorCode: 1,
    data: "",
    message: `Wrong username or password`,
  };
};

export { handleLogin };
