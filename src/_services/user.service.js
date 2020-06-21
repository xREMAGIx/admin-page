import { authHeader } from "../_helpers";
import axios from "axios";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
  getMe,
};

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

async function login(user) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(user);

  return await axios
    .post(`/api/auth/login`, body, requestConfig)
    .then(handleResponse);
}

async function getMe(token) {
  setAuthToken(token);
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.get(`/api/auth/me`, requestConfig).then(handleResponse);
}

async function logout() {
  // remove user from local storage to log user out
  await axios.post("/api/auth/logout");
  localStorage.removeItem("user");
}

async function getAll() {
  const requestConfig = {
    headers: {},
  };
  return await axios.get(`/api/user`, requestConfig).then(handleResponse);
}

async function getById(id) {
  const requestConfig = {
    headers: {},
  };
  return await axios.get(`/api/user/${id}`, requestConfig).then(handleResponse);
}

async function register(user) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);
  await axios.post("/api/auth/register", body, config).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`/api/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`/api/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  let data = response.data;

  console.log(response);

  if (response.status > 400) {
    const error = (response && response.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
