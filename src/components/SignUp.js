import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebase from "../firebase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const SignUp = ({ history }) => {
    const handleSignUp = useCallback(
        async event => {
            event.preventDefault();
            const {
                email: { value: email },
                password: { value: password },
                passwordConfirm: { value: passwordConfirm }
            } = event.target.elements;

            if (password === passwordConfirm) {
                try {
                    await firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password);
                    history.push("/");
                } catch (error) {
                    alert(error);
                }
            } else {
                alert("Password and confirmations are different!");
            }
        },
        [history]
    );

    return (
        <Container>
            <h1>Sign up</h1>
            <Form onSubmit={handleSignUp}>
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
                <Form.Group>
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control
                        name="passwordConfirm"
                        type="password"
                        placeholder="Repeat Your Password"
                    />
                </Form.Group>
                <Button type="submit">Sign Up</Button>
            </Form>
        </Container>
    );
};

export default withRouter(SignUp);
