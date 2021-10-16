import axios from "axios";

const baseUrl = "http://localhost:4000";
const TOKEN_NAME = "kukka_coin_";

export const getToken = ()  => {
  const token = localStorage.getItem(TOKEN_NAME);
  if (TOKEN_NAME) return token;
  return null;
};

const validate = async () => {
  try {
    const token = getToken();
    const res = await axios.get(`${baseUrl}/api/auth`, {
      headers: {
        ...(token ? {Authorization: `Bearer ${token}`} : {})
      }
    });
    if (res?.data?.token) {
      localStorage.setItem(TOKEN_NAME, res.data.token);
    }
    return res;
  } catch (e) {
    return e.response;
  }
};

const auth = async (type, username, password) => {
  try {
    const token = getToken();
    const res = await axios.post(`${baseUrl}/api/${type}`, {
      username,
      password,
    }, {
      headers: {
        ...(token ? {Authorization: `Bearer ${token}`} : {})
      }
    });
    if (res?.data?.token) {
      localStorage.setItem(TOKEN_NAME, res.data.token);
    }
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
