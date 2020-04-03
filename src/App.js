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
import TextEditor from "./front-end/TextEditor";
import Banner from "./front-end/Banner";
import Posts from "./front-end/Posts";
import PostsAdd from "./front-end/PostsAdd";
import PostsEdit from "./front-end/PostsEdit";

const App = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/dashboard" component={Dashboard}></Route>
        <Route exact path="/products" component={Products}></Route>
        <Route exact path="/products-edit/:id" component={ProductsEdit}></Route>
        <Route exact path="/orders" component={Orders}></Route>
        <Route exact path="/posts" component={Posts}></Route>
        <Route exact path="/posts-add" component={PostsAdd}></Route>
        <Route exact path="/posts-edit/:id" component={PostsEdit}></Route>
        <Route exact path="/text-editor" component={TextEditor}></Route>
        <Route exact path="/banner" component={Banner}></Route>
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
