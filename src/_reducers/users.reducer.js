import { userConstants } from "../_constants";

const initialState = {
  loading: true,
  isAuthenticated: false,
  user: null,
};

export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return { error: action.error };

    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case userConstants.REGISTER_FAILURE:
      return { loading: false, error: action.error };

    case userConstants.LOGOUT:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        user: null,
      };

    case userConstants.GETME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GETME_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.user.data,
      };
    case userConstants.GETME_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    //GET ALL
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.users.data,
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    //GET BY ID
    case userConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.GETBYID_SUCCESS:
      return {
        ...state,
        item: action.users.data,
      };
    case userConstants.GETBYID_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((user) =>
          user.id === action.id ? { ...user, deleting: true } : user
        ),
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter((user) => user.id !== action.id),
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        }),
      };
    default:
      return state;
  }
}
