import axios from "../config/axiosConfig";

const handleLogin = async (username, password) => {
  const result = await axios.post("login", { username, password });

  return result;
};

export { handleLogin };
