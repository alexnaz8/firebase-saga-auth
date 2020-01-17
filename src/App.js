import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ErrorBoundary from "./containers/ErrorBoundary";
import PrivateRoute from "./components/PrivateRoute";
function App() {
    return (
        <ErrorBoundary>
            <Router>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </Router>
        </ErrorBoundary>
    );
}

export default App;
