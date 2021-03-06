import { authHeader } from "../_helpers";
import axios from "axios";
import backendUrl from "../_constants";

export const orderService = {
  getAll,
  getById,
  update,
  delete: _delete,
};

async function getAll() {
  const requestConfig = {};

  return await axios
    .get(`${backendUrl}/api/orders`, requestConfig)
    .then(handleResponse);
}

async function getById(id) {
  const requestConfig = {};
  return await axios
    .get(`${backendUrl}/api/orders/${id}`, requestConfig)
    .then(handleResponse);
}

async function update(id, data) {
  const body = JSON.stringify(data);
  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  return await axios
    .post(`${backendUrl}/api/orders/${id}`, body, requestConfig)
    .then(handleResponse);
}

async function _delete(id) {
  const requestConfig = {
    // headers: authHeader()
  };

  return await axios
    .delete(`${backendUrl}/api/orders/${id}`, requestConfig)
    .then(handleResponse);
}

function handleResponse(response) {
  const data = response.data;
  if (response.status > 400) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
