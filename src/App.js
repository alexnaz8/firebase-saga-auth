import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ErrorBoundary from "./containers/ErrorBoundary";
import PrivateRoute from "./components/PrivateRoute";
import firebase from "./firebase";
import { connect } from "react-redux";
import { clearCurrentUser, setCurrentUser } from "./redux/authActions";
function App({ currentUser, setCurrentUser, clearCurrentUser }) {
    useEffect(() => {
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setCurrentUser(user);
            } else {
                clearCurrentUser();
            }
        });
    }, [currentUser, setCurrentUser, clearCurrentUser]);
    return (
        <ErrorBoundary>
            <Router basename='/firebase-saga-auth'>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </Router>
        </ErrorBoundary>
    );
}

const mapStateToProps = ({ auth }) => ({ currentUser: auth.currentUser });

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    clearCurrentUser: () => dispatch(clearCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
