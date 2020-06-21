import { brandConstants } from "../_constants";

export function brands(
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
    case brandConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case brandConstants.GETALL_SUCCESS:
      return {
        items: action.brands,
      };
    case brandConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    case brandConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case brandConstants.GETBYID_SUCCESS:
      return {
        ...state,
        item: action.brands,
      };
    case brandConstants.GETBYID_ERROR:
      return { error: action.error };

    case brandConstants.ADD_REQUEST:
      return { ...state, adding: true };
    case brandConstants.ADD_SUCCESS:
      return {};
    case brandConstants.ADD_FAILURE:
      return { error: action.error };

    case brandConstants.UPDATE_REQUEST:
      return {
        ...state,
      };
    case brandConstants.UPDATE_SUCCESS:
      return {};
    case brandConstants.UPDATE_FAILURE:
      return { error: action.error };

    case brandConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((brand) =>
          brand.id === action.id ? { ...brand, deleting: true } : brand
        ),
      };
    case brandConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter((brand) => brand.id !== action.id),
      };
    case brandConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((brand) => {
          if (brand.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...brandCopy } = brand;
            // return copy of user with 'deleteError:[error]' property
            return { ...brandCopy, deleteError: action.error };
          }

          return brand;
        }),
      };
    default:
      return state;
  }
}
