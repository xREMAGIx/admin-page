import React from "react";
import "./App.css";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import Dashboard from "./front-end/Dashboard";
import Orders from "./front-end/Orders";
import Products from "./front-end/Products";
import ProductsEdit from "./front-end/ProductsEdit";
import Login from "./front-end/Login";
import Register from "./front-end/Register";
import { history } from "./_helpers";
import Banner from "./front-end/Banner";
import Posts from "./front-end/Posts";
import PostsAdd from "./front-end/PostsAdd";
import PostsEdit from "./front-end/PostsEdit";
import AdminRoute from "./front-end/routings/AdminRoute";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.users);
  return (
    // <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        {console.log(user)}
        <AdminRoute
          exact
          path="/dashboard"
          user={user}
          component={Dashboard}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/products"
          user={user}
          component={Products}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/products-edit/:id"
          component={ProductsEdit}
        ></AdminRoute>
        <AdminRoute exact path="/orders" component={Orders}></AdminRoute>
        <AdminRoute exact path="/posts" component={Posts}></AdminRoute>
        <AdminRoute exact path="/posts-add" component={PostsAdd}></AdminRoute>
        <AdminRoute
          exact
          path="/posts-edit/:id"
          component={PostsEdit}
        ></AdminRoute>
        {/* <Route exact path="/text-editor" component={TextEditor}></Route> */}
        <AdminRoute exact path="/banner" component={Banner}></AdminRoute>
        <AdminRoute render={() => <h1>404: page not found</h1>} />
      </Switch>
    </Router>
    // </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
