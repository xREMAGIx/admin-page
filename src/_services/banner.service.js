import { authHeader } from "../_helpers";
import axios from "axios";

export const bannerService = {
  get,
  upload,
};

async function get() {
  const requestConfig = {
    //headers: authHeader()
  };

  //return await axios.get(`/api/banner`, requestConfig).then(handleResponse);
}

async function upload(image) {
  console.log(image);

  const imageData = new FormData();

  imageData.append("image", image);

  if (imageData.get("image")) {
    const configFormData = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return await axios
      .put("/api/banner", imageData, configFormData)
      .then(handleResponse);
  }
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
