import { postConstants } from "../_constants";
import { postService } from "../_services";
import { history } from "../_helpers";

export const postActions = {
  add,
  getAll,
  getById,
  update,
  delete: _delete,
};

function getAll() {
  return (dispatch) => {
    dispatch(request());

    postService.getAll().then(
      (posts) => {
        dispatch(success(posts));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: postConstants.GETALL_REQUEST };
  }
  function success(posts) {
    return { type: postConstants.GETALL_SUCCESS, posts };
  }
  function failure(error) {
    return { type: postConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return (dispatch) => {
    dispatch(request(id));
    postService.getById(id).then(
      (posts) => dispatch(success(posts)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id) {
    return { type: postConstants.GETBYID_REQUEST, id };
  }
  function success(posts) {
    return { type: postConstants.GETBYID_SUCCESS, posts };
  }
  function failure(error) {
    return { type: postConstants.GETBYID_FAILURE, error };
  }
}

function add(post, image) {
  return async (dispatch) => {
    dispatch(request(post));
    await postService.add(post, image).then(
      (post) => {
        dispatch(success(post));
        history.push("/posts");
        //history.push("/dashboard");
        //window.location.reload();

        //window.location.reload();
        //dispatch(alertActions.success("Add new post successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(post) {
    return { type: postConstants.ADD_REQUEST, post };
  }
  function success(post) {
    return { type: postConstants.ADD_SUCCESS, post };
  }
  function failure(error) {
    return { type: postConstants.ADD_FAILURE, error };
  }
}

function update(id, post, image) {
  return async (dispatch) => {
    dispatch(request(id));
    await postService.update(id, post, image).then(
      (post) => {
        dispatch(success(id));
        history.push("/posts");
        //window.location.reload();
        //dispatch(alertActions.success("Add new post successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(id) {
    return { type: postConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: postConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: postConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await postService.delete(id).then(
      (id) => {
        dispatch(success(id));
        window.location.reload();
      },
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: postConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: postConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: postConstants.DELETE_FAILURE, id, error };
  }
}
