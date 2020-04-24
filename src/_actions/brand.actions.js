import { brandConstants } from "../_constants";
import { brandService } from "../_services";
//import { history } from "../_helpers";

export const brandActions = {
  add,
  getAll,
  getById,
  update,
  delete: _delete,
};

function getAll() {
  return (dispatch) => {
    dispatch(request());

    brandService.getAll().then(
      (brands) => {
        dispatch(success(brands));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: brandConstants.GETALL_REQUEST };
  }
  function success(brands) {
    return { type: brandConstants.GETALL_SUCCESS, brands };
  }
  function failure(error) {
    return { type: brandConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await brandService.getById(id).then(
      (brands) => dispatch(success(brands)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id) {
    return { type: brandConstants.GETBYID_REQUEST, id };
  }
  function success(brands) {
    return { type: brandConstants.GETBYID_SUCCESS, brands };
  }
  function failure(error) {
    return { type: brandConstants.GETBYID_FAILURE, error };
  }
}

function add(brand, image) {
  return async (dispatch) => {
    dispatch(request(brand));
    await brandService.add(brand, image).then(
      (brand) => {
        dispatch(success(brand));
        //history.push("/brands");
        window.location.reload();

        //window.location.reload();
        //dispatch(alertActions.success("Add new post successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(brand) {
    return { type: brandConstants.ADD_REQUEST, brand };
  }
  function success(brand) {
    return { type: brandConstants.ADD_SUCCESS, brand };
  }
  function failure(error) {
    return { type: brandConstants.ADD_FAILURE, error };
  }
}

function update(id, brand, image) {
  return async (dispatch) => {
    dispatch(request(id));
    await brandService.update(id, brand, image).then(
      (id) => {
        dispatch(success(id));
        window.location.reload();
        //dispatch(alertActions.success("Add new post successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(id) {
    return { type: brandConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: brandConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: brandConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await brandService.delete(id).then(
      (id) => {
        dispatch(success(id));
        window.location.reload();
      },
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: brandConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: brandConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: brandConstants.DELETE_FAILURE, id, error };
  }
}
