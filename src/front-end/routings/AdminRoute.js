import React from "react";

import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, user, ...rest }) => {
  //const user = useSelector((state) => state.users);

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
        if (!user.isAuthenticated && !user.loading) {
          return <Redirect to="/"></Redirect>;
        } else if (!user) {
          return console.log(user) && <Redirect to="/"></Redirect>;
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
