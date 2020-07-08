import { postConstants } from "../_constants";

export function posts(
  state = { loading: false, adding: false, updating: false, items: [] },
  action
) {
  switch (action.type) {
    case postConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case postConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.posts,
      };
    case postConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case postConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case postConstants.GETBYID_SUCCESS:
      return {
        ...state,
        item: action.posts,
      };
    case postConstants.GETBYID_ERROR:
      return { error: action.error };

    case postConstants.ADD_REQUEST:
      return { ...state, adding: true };
    case postConstants.ADD_SUCCESS:
      return {};
    case postConstants.ADD_FAILURE:
      return { error: action.error };

    case postConstants.UPDATE_REQUEST:
      return {
        ...state,
        // items: state.items.map(post =>
        //   post.id === action.id ? { ...post, updating: true } : post
        // )
      };
    case postConstants.UPDATE_SUCCESS:
      return {
        // items: state.items.map(post =>
        //   post.id === action.id ? { ...post, updating: false } : post
        // )
      };
    case postConstants.UPDATE_FAILURE:
      return { error: action.error };

    case postConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((post) =>
          post.id === action.id ? { ...post, deleting: true } : post
        ),
      };
    case postConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter((post) => post.id !== action.id),
      };
    case postConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((post) => {
          if (post.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...postCopy } = post;
            // return copy of user with 'deleteError:[error]' property
            return { ...postCopy, deleteError: action.error };
          }

          return post;
        }),
      };
    default:
      return state;
  }
}
