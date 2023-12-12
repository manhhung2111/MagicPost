import User from "../models/User";
const bcrypt = require("bcrypt");

const userLogin = async (user_name, password) => {
  // check fill
  if (!user_name || !password) {
    throw Error("All fields must be filled");
  }

  // check username
  const user = await User.findOne({ user_name: user_name });
  if (!user) {
    throw Error("Incorrect username");
  }

  //check password
  // const match = await bcrypt.compare(password, user.password);
  if (password !== user.password) {
    throw Error("Incorrect password");
  }

  return user;
};

export { userLogin };
