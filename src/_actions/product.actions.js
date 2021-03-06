import { productConstants } from "../_constants";
import { categoryConstants } from "../_constants";
import { brandConstants } from "../_constants";
import { productService } from "../_services";
import { categoryService } from "../_services";
import { brandService } from "../_services";
import { history } from "../_helpers";

export const productActions = {
  add,
  getAll,
  getById,
  update,
  delete: _delete,
};

function getAll() {
  return (dispatch) => {
    dispatch(request());

    productService.getAll().then(
      (products) => {
        dispatch(success(products));

        //category getAll
        dispatch(requestCategory());
        categoryService.getAll().then(
          (categories) => {
            dispatch(successCategory(categories));

            //brand getAll
            dispatch(requestBrand());
            brandService.getAll().then(
              (brands) => {
                dispatch(successBrand(brands));
              },
              (error) => dispatch(failureBrand(error.toString()))
            );
          },
          (error) => dispatch(failureCategory(error.toString()))
        );
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: productConstants.GETALL_REQUEST };
  }
  function success(products) {
    return { type: productConstants.GETALL_SUCCESS, products };
  }
  function failure(error) {
    return { type: productConstants.GETALL_FAILURE, error };
  }
  function requestCategory() {
    return { type: categoryConstants.GETALL_REQUEST };
  }
  function successCategory(categories) {
    return { type: categoryConstants.GETALL_SUCCESS, categories };
  }
  function failureCategory(error) {
    return { type: categoryConstants.GETALL_FAILURE, error };
  }
  function requestBrand() {
    return { type: brandConstants.GETALL_REQUEST };
  }
  function successBrand(brands) {
    return { type: brandConstants.GETALL_SUCCESS, brands };
  }
  function failureBrand(error) {
    return { type: brandConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return (dispatch) => {
    //category getAll
    dispatch(requestCategory());
    categoryService.getAll().then(
      (categories) => {
        dispatch(successCategory(categories));

        //brand getAll
        dispatch(requestBrand());
        brandService.getAll().then(
          (brands) => {
            dispatch(successBrand(brands));
            dispatch(request(id));
            productService.getById(id).then(
              (products) => {
                dispatch(success(products));
              },
              (error) => dispatch(failure(error.toString()))
            );
          },
          (error) => dispatch(failureBrand(error.toString()))
        );
      },
      (error) => dispatch(failureCategory(error.toString()))
    );
  };

  function request(id) {
    return { type: productConstants.GETBYID_REQUEST, id };
  }
  function success(products) {
    return { type: productConstants.GETBYID_SUCCESS, products };
  }
  function failure(error) {
    return { type: productConstants.GETBYID_FAILURE, error };
  }
  function requestCategory() {
    return { type: categoryConstants.GETALL_REQUEST };
  }
  function successCategory(categories) {
    return { type: categoryConstants.GETALL_SUCCESS, categories };
  }
  function failureCategory(error) {
    return { type: categoryConstants.GETALL_FAILURE, error };
  }
  function requestBrand() {
    return { type: brandConstants.GETALL_REQUEST };
  }
  function successBrand(brands) {
    return { type: brandConstants.GETALL_SUCCESS, brands };
  }
  function failureBrand(error) {
    return { type: brandConstants.GETALL_FAILURE, error };
  }
}

function add(product, image) {
  return async (dispatch) => {
    dispatch(request(product));
    await productService.add(product, image).then(
      (product) => {
        dispatch(success(product));
        history.push("/products");
        //window.location.reload();
        //dispatch(alertActions.success("Add new product successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(product) {
    return { type: productConstants.ADD_REQUEST, product };
  }
  function success(product) {
    return { type: productConstants.ADD_SUCCESS, product };
  }
  function failure(error) {
    return { type: productConstants.ADD_FAILURE, error };
  }
}

function update(id, product, image, delImageId) {
  console.log(product);
  return async (dispatch) => {
    dispatch(request(id));
    await productService.update(id, product, image, delImageId).then(
      (product) => {
        dispatch(success(id));
        history.push("/products");
        //window.location.reload();
        //dispatch(alertActions.success("Add new product successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(id) {
    return { type: productConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: productConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: productConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await productService.delete(id).then(
      (id) => {
        dispatch(success(id));
        window.location.reload();
      },
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: productConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: productConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: productConstants.DELETE_FAILURE, id, error };
  }
}
