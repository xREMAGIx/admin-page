import React from "react";
import "./App.css";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import Dashboard from "./front-end/Dashboard";
import Orders from "./front-end/Orders";
import Products from "./front-end/Products";
import ProductsEdit from "./front-end/ProductsEdit";
import TextEditor from "./front-end/TextEditor";
import Login from "./front-end/Login";
import Register from "./front-end/Register";
import { history } from "./_helpers";

//const App = ({ store }) => (
//const alert = useSelector(state => state.alert);
//const dispatch = useDispatch();

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
        <Route exact path="/text-editor">
          <TextEditor />
        </Route>
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
