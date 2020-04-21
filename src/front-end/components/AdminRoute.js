import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, user, ...rest }) => {
  const users = useSelector((state) => state.users);

  return (
    <Route
      {...rest}
      render={(props) => {
        // !user.isAuthenticated && !user.loading ? (
        //   <Redirect to="/"></Redirect>
        // ) : user && user.user.role !== "user" ? (
        //   console.log(user) && <Redirect to="/"></Redirect>
        // ) : (
        //   <Component {...rest} {...props}></Component>
        // )

        if (!users.isAuthenticated && !users.loading) {
          return <Redirect to="/"></Redirect>;
        } else if (!users) {
          return <Redirect to="/"></Redirect>;
        } else return <Component {...rest} {...props}></Component>;
      }}
    ></Route>
  );
};

export default AdminRoute;
//
// const mapStateToProps = state => ({
//   auth: state.auth
// });
