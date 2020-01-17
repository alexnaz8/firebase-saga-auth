import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const SearchComponent = ({ onUserSearch }) => {
    const getName = e => {
        e.preventDefault();
        let name = e.target.elements.name.value;
        name = name.charAt(0).toUpperCase() + name.slice(1);
        onUserSearch(name);
    };
    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Form onSubmit={getName}>
                        <Form.Group controlId="search-input">
                            <Form.Label>Employee Name</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Type name here"
                                    aria-label="Type name here"
                                    name="name"
                                />
                                <InputGroup.Append>
                                    <Button
                                        type="submit"
                                        variant="outline-secondary"
                                    >
                                        Search
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SearchComponent;
