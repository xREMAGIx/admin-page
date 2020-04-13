import { bannerConstants } from "../_constants";
import { bannerService } from "../_services";
import { history } from "../_helpers";

export const bannerActions = {
  get,
  upload,
};

function get() {
  return (dispatch) => {
    dispatch(request());

    bannerService.getAll().then(
      (banner) => dispatch(success(banner)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: bannerConstants.GET_REQUEST };
  }
  function success(banner) {
    return { type: bannerConstants.GET_SUCCESS, banner };
  }
  function failure(error) {
    return { type: bannerConstants.GET_FAILURE, error };
  }
}

function upload(image) {
  return async (dispatch) => {
    dispatch(request(image));
    await bannerService.upload(image).then(
      (image) => {
        dispatch(success(image));
        //history.push("/products");
        window.location.reload();
        //dispatch(alertActions.success("Add new product successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(image) {
    return { type: bannerConstants.UPLOAD_REQUEST, image };
  }
  function success(image) {
    return { type: bannerConstants.UPLOAD_SUCCESS, image };
  }
  function failure(error) {
    return { type: bannerConstants.UPLOAD_FAILURE, error };
  }
}
