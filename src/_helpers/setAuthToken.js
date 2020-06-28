import axios from "axios";

const setAuthToken = (token) => {
  console.log("b");
  if (token) axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  else delete axios.defaults.headers.common["Authorization"];
};

export default setAuthToken;
