import { orderConstants } from "../_constants";
import { orderService } from "../_services";
import { history } from "../_helpers";

export const orderActions = {
  getAll,
  getById,
  update,
  delete: _delete,
};

function getAll() {
  return (dispatch) => {
    dispatch(request());

    orderService.getAll().then(
      (orders) => {
        dispatch(success(orders));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: orderConstants.GETALL_REQUEST };
  }
  function success(orders) {
    return { type: orderConstants.GETALL_SUCCESS, orders };
  }
  function failure(error) {
    return { type: orderConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await orderService.getById(id).then(
      (orders) => dispatch(success(orders)),
      (error) => {
        if (error.response && error.response.data) {
          let errorkey = Object.keys(error.response.data)[0];

          let errorValue = error.response.data[errorkey][0];

          dispatch(failure(errorkey.toUpperCase() + ": " + errorValue));
        } else {
          dispatch(failure(error.toString()));
        }
      }
    );
  };

  function request(id) {
    return { type: orderConstants.GETBYID_REQUEST, id };
  }
  function success(orders) {
    return { type: orderConstants.GETBYID_SUCCESS, orders };
  }
  function failure(error) {
    return { type: orderConstants.GETBYID_FAILURE, error };
  }
}

function update(id, data) {
  return async (dispatch) => {
    dispatch(request(id));
    await orderService.update(id, data).then(
      (orders) => {
        dispatch(success(orders));
        history.push("/orders");
      },
      (error) => {
        if (error.response && error.response.data) {
          let errorkey = Object.keys(error.response.data)[0];

          let errorValue = error.response.data[errorkey][0];

          dispatch(failure(errorkey.toUpperCase() + ": " + errorValue));
        } else {
          dispatch(failure(error.toString()));
        }
      }
    );
  };

  function request(id) {
    return { type: orderConstants.UPDATE_REQUEST, id };
  }
  function success(orders) {
    return { type: orderConstants.UPDATE_SUCCESS, orders };
  }
  function failure(error) {
    return { type: orderConstants.UPDATE_FAILURE, error };
  }
}

function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await orderService.delete(id).then(
      (id) => {
        dispatch(success(id));
        window.location.reload();
      },
      (error) => {
        if (error.response && error.response.data) {
          let errorkey = Object.keys(error.response.data)[0];

          let errorValue = error.response.data[errorkey][0];

          dispatch(failure(errorkey.toUpperCase() + ": " + errorValue));
        } else {
          dispatch(failure(error.toString()));
        }
      }
    );
  };

  function request(id) {
    return { type: orderConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: orderConstants.DELETE_SUCCESS, id };
  }
  function failure(error) {
    return { type: orderConstants.DELETE_FAILURE, error };
  }
}
