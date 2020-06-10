import { authHeader } from "../_helpers";
import axios from "axios";

export const orderService = {
  getAll,
  getById,
  update,
};

async function getAll() {
  const requestConfig = {
    headers: authHeader(),
  };

  return await axios.get(`/api/orders`, requestConfig).then(handleResponse);
}

async function getById(id) {
  const requestConfig = {
    headers: authHeader(),
  };
  return await axios
    .get(`/api/orders/${id}`, requestConfig)
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

  console.log(11111111111111111111111111111);
  console.log(body);

  return await axios
    .post(`/api/orders/${id}`, body, requestConfig)
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
