import { bannerConstants } from "../_constants";
import { bannerService } from "../_services";
import { history } from "../_helpers";

export const bannerActions = {
  //add,
  getAll,
  //delete: _delete,
  add_delete,
};

function getAll() {
  return (dispatch) => {
    dispatch(request());

    bannerService.getAll().then(
      (banner) => dispatch(success(banner)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: bannerConstants.GETALL_REQUEST };
  }
  function success(banners) {
    return { type: bannerConstants.GETALL_SUCCESS, banners };
  }
  function failure(error) {
    return { type: bannerConstants.GETALL_FAILURE, error };
  }
}

// function add(image) {
//   return async (dispatch) => {
//     dispatch(request(image));
//     await bannerService.add(image).then(
//       (image) => {
//         dispatch(success(image));
//         //dispatch(alertActions.success("Add new product successful"));
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//         //dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };

//   function request(image) {
//     return { type: bannerConstants.ADD_REQUEST, image };
//   }
//   function success(image) {
//     return { type: bannerConstants.ADD_SUCCESS, image };
//   }
//   function failure(error) {
//     return { type: bannerConstants.ADD_FAILURE, error };
//   }
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//   return async (dispatch) => {
//     dispatch(request(id));
//     await bannerService.delete(id).then(
//       (id) => {
//         dispatch(success(id));
//       },
//       (error) => dispatch(failure(id, error.toString()))
//     );
//   };

//   function request(id) {
//     return { type: bannerConstants.DELETE_REQUEST, id };
//   }
//   function success(id) {
//     return { type: bannerConstants.DELETE_SUCCESS, id };
//   }
//   function failure(id, error) {
//     return { type: bannerConstants.DELETE_FAILURE, id, error };
//   }
// }

function add_delete(image, id) {
  return async (dispatch) => {
    dispatch(requestAdd(image));
    await bannerService.add(image).then(
      async (image) => {
        dispatch(successAdd(image));
        dispatch(requestDelete(id));
        await bannerService.delete(id).then(
          (id) => {
            dispatch(successDelete(id));
            history.go();
          },
          (error) => dispatch(failureDelete(id, error.toString()))
        );
      },
      (error) => {
        dispatch(failureAdd(error.toString()));
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function requestAdd(image) {
    return { type: bannerConstants.ADD_REQUEST, image };
  }
  function successAdd(image) {
    return { type: bannerConstants.ADD_SUCCESS, image };
  }
  function failureAdd(error) {
    return { type: bannerConstants.ADD_FAILURE, error };
  }
  function requestDelete(id) {
    return { type: bannerConstants.DELETE_REQUEST, id };
  }
  function successDelete(id) {
    return { type: bannerConstants.DELETE_SUCCESS, id };
  }
  function failureDelete(id, error) {
    return { type: bannerConstants.DELETE_FAILURE, id, error };
  }
}
