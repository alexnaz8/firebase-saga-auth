import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const PrivateRoute = ({ component: RouteComponent, currentUser, ...rest }) => {
    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};
const mapStateToProps = ({ auth }) => ({ currentUser: auth.currentUser });

export default connect(mapStateToProps)(PrivateRoute);
