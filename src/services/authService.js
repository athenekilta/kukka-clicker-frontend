import axios from "axios";

const baseUrl = "http://localhost:4000";

const validate = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/auth`);
    return res;
  } catch (e) {
    return e.response;
  }
};

const auth = async (type, username, password) => {
  try {
    const res = await axios.post(`${baseUrl}/api/${type}`, {
      username,
      password,
    });
    return res;
  } catch (e) {
    return e.response;
  }  
};

const login = async (username, password) => {
  return auth("login", username, password);
};

const register = async (username, password) => {
  return auth("register", username, password);
};

export default {
  validate,
  register,
  login,
};
