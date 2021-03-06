import axios from "axios";
import backendUrl from "../_constants";

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

async function login(user) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(user);

  return await axios
    .post(`${backendUrl}/api/auth/login`, body, requestConfig)
    .then(handleResponse);
}

async function getMe() {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios
    .get(`${backendUrl}/api/auth/me`, requestConfig)
    .then(handleResponse);
}

async function logout() {
  // remove user from local storage to log user out
  await axios.post(`${backendUrl}/api/auth/logout`);
  localStorage.removeItem("user");
}

async function getAll() {
  const requestConfig = {
    headers: {},
  };
  return await axios
    .get(`${backendUrl}/api/user`, requestConfig)
    .then(handleResponse);
}

async function getById(id) {
  const requestConfig = {};
  return await axios
    .get(`${backendUrl}/api/user/${id}`, requestConfig)
    .then(handleResponse);
}

async function register(user) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);
  await axios
    .post(`${backendUrl}/api/auth/register`, body, config)
    .then(handleResponse);
}

async function update(id, user) {
  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);

  return await axios
    .put(`/api/user/${id}`, body, requestConfig)
    .then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
  };

  return fetch(`${backendUrl}/api/users/${id}`, requestOptions).then(
    handleResponse
  );
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
