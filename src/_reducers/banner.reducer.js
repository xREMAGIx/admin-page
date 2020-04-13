import { bannerConstants } from "../_constants";

export function banner(state = { banner: [] }, action) {
  switch (action.type) {
    case bannerConstants.GET_REQUEST:
      return {
        loading: true,
      };
    case bannerConstants.GET_SUCCESS:
      return {
        items: action.posts,
      };
    case bannerConstants.GET_FAILURE:
      return {
        error: action.error,
      };

    case bannerConstants.UPDATE_REQUEST:
      return {
        ...state,
      };
    case bannerConstants.UPDATE_SUCCESS:
      return {};
    case bannerConstants.UPDATE_FAILURE:
      return { error: action.error };
    default:
      return state;
  }
}
