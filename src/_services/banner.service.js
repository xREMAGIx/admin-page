//import { authHeader } from "../_helpers";
import axios from "axios";
import backendUrl from "../_constants";

export const bannerService = {
  getAll,
  add,
  delete: _delete,
};

async function getAll() {
  const requestConfig = {
    //headers: authHeader()
  };

  return await axios
    .get(`${backendUrl}/api/banner`, requestConfig)
    .then(handleResponse);
}

async function add(image) {
  console.log(image);

  const imageData = new FormData();

  for (let i = 0; i < image.length; i++)
    imageData.append("image", image[i].img);

  console.log(imageData);

  if (imageData.get("image")) {
    const configFormData = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return await axios
      .post(`${backendUrl}/api/banner`, imageData, configFormData)
      .then(handleResponse);
  }
}

async function _delete(delImage) {
  for (let i = 0; i < delImage.length; i++)
    try {
      await axios
        .delete(`${backendUrl}/api/banner/` + delImage[i])
        .then(handleResponse);
    } catch (error) {
      console.log(error);
    }
}

function handleResponse(response) {
  const data = response.data.data;
  console.log(data);
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
