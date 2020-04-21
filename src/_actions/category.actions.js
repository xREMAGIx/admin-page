import { categoryConstants } from "../_constants";
import { categoryService } from "../_services";
import { history } from "../_helpers";

export const categoryActions = {
  add,
  getAll,
  getById,
  update,
  delete: _delete,
};

function getAll() {
  return (dispatch) => {
    dispatch(request());

    categoryService.getAll().then(
      (categories) => {
        console.log(categories);
        dispatch(success(categories));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: categoryConstants.GETALL_REQUEST };
  }
  function success(categories) {
    return { type: categoryConstants.GETALL_SUCCESS, categories };
  }
  function failure(error) {
    return { type: categoryConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await categoryService.getById(id).then(
      (categories) => dispatch(success(categories)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id) {
    return { type: categoryConstants.GETBYID_REQUEST, id };
  }
  function success(categories) {
    return { type: categoryConstants.GETBYID_SUCCESS, categories };
  }
  function failure(error) {
    return { type: categoryConstants.GETBYID_FAILURE, error };
  }
}

function add(category, image) {
  return async (dispatch) => {
    dispatch(request(category));
    await categoryService.add(category, image).then(
      (category) => {
        dispatch(success(category));
        //history.push("/categories");
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

  function request(category) {
    return { type: categoryConstants.ADD_REQUEST, category };
  }
  function success(category) {
    return { type: categoryConstants.ADD_SUCCESS, category };
  }
  function failure(error) {
    return { type: categoryConstants.ADD_FAILURE, error };
  }
}

function update(id, category, image) {
  return async (dispatch) => {
    dispatch(request(id));
    await categoryService.update(id, category, image).then(
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
    return { type: categoryConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: categoryConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: categoryConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await categoryService.delete(id).then(
      (id) => {
        dispatch(success(id));
        window.location.reload();
      },
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: categoryConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: categoryConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: categoryConstants.DELETE_FAILURE, id, error };
  }
}
