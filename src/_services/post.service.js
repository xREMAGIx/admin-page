import axios from "axios";
import backendUrl from "../_constants";

export const postService = {
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
    .get(`${backendUrl}/api/posts`, requestConfig)
    .then(handleResponse);
}

async function getById(id) {
  const requestConfig = {};
  return await axios
    .get(`${backendUrl}/api/posts/${id}`, requestConfig)
    .then(handleResponse);
}

async function add(post, image) {
  const imageData = new FormData();
  imageData.append("image", image);

  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  console.log(post);
  const body = JSON.stringify(post);
  console.log(body);

  if (imageData.get("image")) {
    let res;
    try {
      res = await axios.post(`${backendUrl}/api/posts`, body, requestConfig);
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
          `${backendUrl}/api/posts/` + res.data.data._id + "/image",
          imageData,
          configFormData
        )
        .then(handleResponse);
    } catch (error) {
      console.log(error);
    }
  } else {
    return await axios
      .post(`${backendUrl}/api/posts`, body, requestConfig)
      .then(handleResponse);
  }
}

async function update(id, post, image) {
  const imageData = new FormData();
  imageData.append("image", image);

  const requestConfig = {
    headers: {
      //authHeader(),
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(post);
  console.log(body);

  if (imageData.get("image")) {
    try {
      await axios.put(`${backendUrl}/api/post/${id}`, body, requestConfig);
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
          `${backendUrl}/api/posts/` + id + "/image",
          imageData,
          configFormData
        )
        .then(handleResponse);
    } catch (error) {
      console.log(error);
    }
  } else {
    return await axios
      .put(`${backendUrl}/api/posts/${id}`, body, requestConfig)
      .then(handleResponse);
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(id) {
  const requestConfig = {
    // headers: authHeader()
  };

  return await axios
    .delete(`${backendUrl}/api/posts/${id}`, requestConfig)
    .then(handleResponse);
}

function handleResponse(response) {
  const data = response.data.data;
  if (response.status > 400) {
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
