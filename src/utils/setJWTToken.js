import axios from "./axiosFlare";

const setJWTToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setJWTToken;
