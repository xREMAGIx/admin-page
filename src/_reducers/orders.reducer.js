import { orderConstants } from "../_constants";

export function orders(
  state = {
    loading: false,
    adding: false,
    updating: false,
    items: [],
    item: [],
  },
  action
) {
  switch (action.type) {
    case orderConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.orders.data,
      };
    case orderConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    case orderConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case orderConstants.GETBYID_SUCCESS:
      return {
        ...state,
        item: action.orders.data,
      };
    case orderConstants.GETBYID_ERROR:
      return { error: action.error };

    default:
      return state;
  }
}
