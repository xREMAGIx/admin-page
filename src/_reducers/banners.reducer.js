import { bannerConstants } from "../_constants";

export function banners(
  state = { loading: false, adding: false, updating: false, items: [] },
  action
) {
  switch (action.type) {
    case bannerConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case bannerConstants.GETALL_SUCCESS:
      return {
        items: action.banners,
      };
    case bannerConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    case bannerConstants.ADD_REQUEST:
      return {
        ...state,
      };
    case bannerConstants.ADD_SUCCESS:
      return { ...state };
    case bannerConstants.ADD_FAILURE:
      return { error: action.error };

    case bannerConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((banner) =>
          banner.id === action.id ? { ...banner, deleting: true } : banner
        ),
      };
    case bannerConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter((banner) => banner.id !== action.id),
      };
    case bannerConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((banner) => {
          if (banner.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...bannerCopy } = banner;
            // return copy of user with 'deleteError:[error]' property
            return { ...bannerCopy, deleteError: action.error };
          }

          return banner;
        }),
      };
    default:
      return state;
  }
}
