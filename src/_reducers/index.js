import { combineReducers } from "redux";

// import { authentication } from "./authentication.reducer";
// import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { products } from "./products.reducer";
import { posts } from "./posts.reducer";
import { banner } from "./banner.reducer";

const rootReducer = combineReducers({
  //   authentication,
  //   registration,
  banner,
  posts,
  products,
  users,
});

export default rootReducer;
