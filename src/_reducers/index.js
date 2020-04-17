import { combineReducers } from "redux";

// import { authentication } from "./authentication.reducer";
// import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { products } from "./products.reducer";
import { posts } from "./posts.reducer";
import { banners } from "./banners.reducer";

const rootReducer = combineReducers({
  //   authentication,
  //   registration,
  banners,
  posts,
  products,
  users,
});

export default rootReducer;
