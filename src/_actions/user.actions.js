import { userConstants } from "../_constants";
import { userService } from "../_services";
import { history } from "../_helpers";

export const userActions = {
  login,
  logout,
  register,
  getAll,
  getById,
  delete: _delete,
  getMe,
  update,
};

function getMe() {
  return async (dispatch) => {
    dispatch(request());

    await userService.getMe().then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error));
        history.push({ pathname: "/login", state: 404 });
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: userConstants.GETME_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GETME_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GETME_FAILURE, error };
  }
}

function login(user) {
  return async (dispatch) => {
    dispatch(request(user));

    await userService.login(user).then(
      (data) => {
        dispatch(success(data));
        dispatch(getMe());

        history.push({ pathname: "/", state: 200 });
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(data) {
    return { type: userConstants.LOGIN_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  history.push("/login");
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success(user));
        history.push({ pathname: "/", state: 200 });
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getAll() {
  return async (dispatch) => {
    dispatch(request());

    await userService.getAll().then(
      (users) => dispatch(success(users)),
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

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request());

    await userService.getById(id).then(
      (users) => dispatch(success(users)),
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

  function request() {
    return { type: userConstants.GETBYID_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETBYID_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETBYID_FAILURE, error };
  }
}

function update(id, user) {
  return async (dispatch) => {
    dispatch(request(id));
    await userService.update(id, user).then(
      (id) => {
        dispatch(success(id));

        history.push({ pathname: "/users", state: 202 });
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(id) {
    return { type: userConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.UPDATE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
