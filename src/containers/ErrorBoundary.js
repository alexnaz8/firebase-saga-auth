import React, { Component } from "react";
class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        console.log(error);
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h1 className="text-center">Well, something is not OK.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
