import React, { useCallback } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "../firebase";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

const Login = ({ currentUser, history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <Container>
            <h1>Log in</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Email"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
                <Button type="submit">Log in</Button>
                <span className="mx-2">or</span>
                <Button onClick={() => history.push("/signup")}>Sing Up</Button>
            </Form>
        </Container>
    );
};

const mapStateToProps = ({ auth }) => ({ currentUser: auth.currentUser });

export default connect(mapStateToProps)(withRouter(Login));
