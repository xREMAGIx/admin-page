import { productConstants } from "../_constants";

export function products(
  state = {
    loading: false,
    adding: false,
    updating: false,
    items: [],
    item: null,
  },
  action
) {
  switch (action.type) {
    case productConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case productConstants.GETALL_SUCCESS:
      return {
        items: action.products,
      };
    case productConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    case productConstants.GETBYID_REQUEST:
      return {
        loading: true,
      };
    case productConstants.GETBYID_SUCCESS:
      return {
        item: action.products,
      };
    case productConstants.GETBYID_ERROR:
      return { error: action.error };

    case productConstants.ADD_REQUEST:
      return { ...state, adding: true };
    case productConstants.ADD_SUCCESS:
      return {
        // items: [
        //   ...state.items.filter(product => product.id !== action.id),
        //   action.product
        // ],
        // adding: false
      };
    case productConstants.ADD_FAILURE:
      return { error: action.error };

    case productConstants.UPDATE_REQUEST:
      return {
        ...state,
        // items: state.items.map(product =>
        //   product.id === action.id ? { ...product, updating: true } : product
        // )
        updating: true,
      };
    case productConstants.UPDATE_SUCCESS:
      return {
        //...state,
        // items: state.items.map(product =>
        //   product._id === action.id ? { ...product, updating: false } : product
        // )
      };
    case productConstants.UPDATE_FAILURE:
      return { error: action.error };

    case productConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((product) =>
          product.id === action.id ? { ...product, deleting: true } : product
        ),
      };
    case productConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter((product) => product.id !== action.id),
      };
    case productConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((product) => {
          if (product.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...productCopy } = product;
            // return copy of user with 'deleteError:[error]' property
            return { ...productCopy, deleteError: action.error };
          }

          return product;
        }),
      };
    default:
      return state;
  }
}
