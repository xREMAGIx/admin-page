import { authHeader } from "../_helpers";
import axios from "axios";

export const productService = {
  getAll,
  getById,
  add,
  update,
  delete: _delete
};

async function getAll() {
  const requestConfig = {
    //headers: authHeader()
  };

  return await axios.get(`/api/products`, requestConfig).then(handleResponse);
}

async function getById(id) {
  const requestConfig = {
    headers: authHeader()
  };
  return await axios
    .get(`/api/products/${id}`, requestConfig)
    .then(handleResponse);
}

async function add(product, image) {
  const imageData = new FormData();
  imageData.append("image", image);

  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(product);

  if (imageData.get("image")) {
    let res;
    try {
      res = await axios.post(`/api/products`, body, requestConfig);
    } catch (error) {
      console.log(error);
    }

    const configFormData = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    try {
      return await axios
        .put(
          "/api/products/" + res.data.data._id + "/image",
          imageData,
          configFormData
        )
        .then(handleResponse);
    } catch (error) {
      console.log(error);
    }
  } else {
    return await axios
      .post("/api/products", body, requestConfig)
      .then(handleResponse);
  }
}

async function update(id, product, image) {
  const imageData = new FormData();
  imageData.append("image", image);

  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(product);

  if (imageData.get("image")) {
    try {
      await axios.put(`/api/products/${id}`, body, requestConfig);
    } catch (error) {
      console.log(error);
    }

    const configFormData = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    try {
      return await axios
        .put("/api/products/" + id + "/image", imageData, configFormData)
        .then(handleResponse);
    } catch (error) {
      console.log(error);
    }
  } else {
    return await axios
      .put(`/api/products/${id}`, body, requestConfig)
      .then(handleResponse);
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
  const requestConfig = {
    // headers: authHeader()
  };

  return await axios
    .delete(`/api/products/${id}`, requestConfig)
    .then(handleResponse);
}

function handleResponse(response) {
  const data = response.data.data;
  if (response.status !== 200) {
    // if (response.status === 401) {
    //   // auto logout if 401 response returned from api
    //   //logout();
    //   location.reload(true);
    // }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
