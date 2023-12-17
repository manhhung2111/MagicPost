import axios from "../config/axiosConfig";

const handleLogin = async (username, password) => {
  const result = await axios.post("general/login", {
    user_name: username,
    password,
  });

  return result;
};

const verifyUser = async () => {
  const result = await axios.get("general/verify");
  return result;
};

export { handleLogin, verifyUser };
