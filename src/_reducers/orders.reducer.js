import { orderConstants } from "../_constants";

export function orders(
  state = {
    loading: false,
    adding: false,
    updating: false,
    items: null,
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
        ...state,
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

    case orderConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((order) =>
          order.id === action.id ? { ...order, deleting: true } : order
        ),
      };
    case orderConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter((order) => order.id !== action.id),
      };
    case orderConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((order) => {
          if (order.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...orderCopy } = order;
            // return copy of user with 'deleteError:[error]' property
            return { ...orderCopy, deleteError: action.error };
          }

          return order;
        }),
      };

    default:
      return state;
  }
}
