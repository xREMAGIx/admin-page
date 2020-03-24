import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from "./front-end/Dashboard";
import Orders from "./front-end/Orders";
import Products from "./front-end/Products";
import ProductsEdit from "./front-end/ProductsEdit";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/products-edit">
          <ProductsEdit />
        </Route>
        <Route exact path="/orders">
          <Orders />
        </Route>
      </Router>
    );
  }
}

export default App;
