import axios from "axios";
import backendUrl from "../_constants";

export const productService = {
  getAll,
  getById,
  add,
  update,
  delete: _delete,
};

async function getAll() {
  const requestConfig = {
    //headers: authHeader()
  };
  return await axios
    .get(`${backendUrl}/api/products`, requestConfig)
    .then(handleResponse);
}

async function getById(id) {
  const requestConfig = {};
  return await axios
    .get(`${backendUrl}/api/products/${id}`, requestConfig)
    .then(handleResponse);
}

async function add(product, image) {
  const imageData = new FormData();

  for (let i = 0; i < image.length; i++)
    imageData.append("image", image[i].img);

  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(product);
  console.log(body);

  if (imageData.get("image")) {
    let res;
    try {
      res = await axios.post(`${backendUrl}/api/products`, body, requestConfig);
    } catch (error) {
      console.log(error);
    }

    const configFormData = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      return await axios
        .put(
          `${backendUrl}/api/products/` + res.data.data._id + "/image",
          imageData,
          configFormData
        )
        .then(handleResponse);
    } catch (error) {
      console.log(error);
    }
  } else {
    return await axios
      .post(`${backendUrl}/api/products`, body, requestConfig)
      .then(handleResponse);
  }
}

async function update(id, product, image, delImage) {
  const imageData = new FormData();

  for (let i = 0; i < image.length; i++)
    imageData.append("image", image[i].img);

  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  console.log(product);

  const body = JSON.stringify(product);

  const requestConfig1 = {
    // headers: authHeader()
  };

  for (let i = 0; i < delImage.length; i++)
    try {
      await axios.delete(
        `${backendUrl}/api/products/` + id + "/image/" + delImage[i],
        imageData,
        requestConfig1
      );
    } catch (error) {
      console.log(error);
    }

  if (imageData.get("image")) {
    try {
      await axios.put(`${backendUrl}/api/products/${id}`, body, requestConfig);
    } catch (error) {
      console.log(error);
    }

    const configFormData = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      return await axios
        .put(
          `${backendUrl}/api/products/` + id + "/image",
          imageData,
          configFormData
        )
        .then(handleResponse);
    } catch (error) {
      console.log(error);
    }
  } else {
    return await axios
      .put(`${backendUrl}/api/products/${id}`, body, requestConfig)
      .then(handleResponse);
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
  const requestConfig = {
    // headers: authHeader()
  };

  return await axios
    .delete(`${backendUrl}/api/products/${id}`, requestConfig)
    .then(handleResponse);
}

function handleResponse(response) {
  const data = response.data.data;
  console.log(data);
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
