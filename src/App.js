import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./_helpers";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "./_actions";

import AdminRoute from "./front-end/components/AdminRoute";

import Login from "./front-end/Login";
import Register from "./front-end/Register";

import Products from "./front-end/Products";
import ProductsAdd from "./front-end/ProductsAdd";
import ProductsEdit from "./front-end/ProductsEdit";

import Dashboard from "./front-end/Dashboard";

import Orders from "./front-end/Orders";
import OrdersEdit from "./front-end/OrdersEdit";

import Banner from "./front-end/Banner";

import Posts from "./front-end/Posts";
import PostsAdd from "./front-end/PostsAdd";
import PostsEdit from "./front-end/PostsEdit";

import Categories from "./front-end/Categories";

import Brands from "./front-end/Brands";

import Users from "./front-end/Users";
import UsersEdit from "./front-end/UsersEdit";

import setAuthToken from "./_helpers/setAuthToken";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}
const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(userActions.getMe());
  }, [dispatch]);

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <AdminRoute
          exact
          path="/"
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
          path="/products-add"
          component={ProductsAdd}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/products-edit/:id"
          component={ProductsEdit}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/orders"
          user={user}
          component={Orders}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/orders-edit/:id"
          user={user}
          component={OrdersEdit}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/posts"
          user={user}
          component={Posts}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/posts-add"
          component={PostsAdd}
          user={user}
        ></AdminRoute>
        <AdminRoute
          user={user}
          exact
          path="/posts-edit/:id"
          component={PostsEdit}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/categories"
          user={user}
          component={Categories}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/brands"
          user={user}
          component={Brands}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/banner"
          component={Banner}
          user={user}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/users"
          component={Users}
          user={user}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/users-edit/:id"
          component={UsersEdit}
          user={user}
        ></AdminRoute>
        <AdminRoute render={() => <h1>404: page not found</h1>} />
      </Switch>
    </Router>
  );
};

export default App;
