import { categoryConstants } from "../_constants";

export function categories(
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
    case categoryConstants.GETALL_REQUEST:
      console.log(1);
      return {
        ...state,
        loading: true,
      };
    case categoryConstants.GETALL_SUCCESS:
      return {
        items: action.categories,
      };
    case categoryConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    case categoryConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstants.GETBYID_SUCCESS:
      return {
        ...state,
        item: action.categories,
      };
    case categoryConstants.GETBYID_ERROR:
      return { error: action.error };

    case categoryConstants.ADD_REQUEST:
      return { ...state, adding: true };
    case categoryConstants.ADD_SUCCESS:
      return {};
    case categoryConstants.ADD_FAILURE:
      return { error: action.error };

    case categoryConstants.UPDATE_REQUEST:
      return {
        ...state,
      };
    case categoryConstants.UPDATE_SUCCESS:
      return {};
    case categoryConstants.UPDATE_FAILURE:
      return { error: action.error };

    case categoryConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((category) =>
          category.id === action.id ? { ...category, deleting: true } : category
        ),
      };
    case categoryConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter((category) => category.id !== action.id),
      };
    case categoryConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((category) => {
          if (category.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...categoryCopy } = category;
            // return copy of user with 'deleteError:[error]' property
            return { ...categoryCopy, deleteError: action.error };
          }

          return category;
        }),
      };
    default:
      return state;
  }
}
