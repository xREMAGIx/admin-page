import { combineReducers } from "redux";

// import { authentication } from "./authentication.reducer";
// import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { products } from "./products.reducer";
import { posts } from "./posts.reducer";
import { alert } from "./alert.reducer";

const rootReducer = combineReducers({
  //   authentication,
  //   registration,
  posts,
  products,
  users,
  alert
});

export default rootReducer;
