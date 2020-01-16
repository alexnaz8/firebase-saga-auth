import React from 'react';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SearchComponent = () => {
    return (
        <Container>
            <Row>
                <Col md={4}>
                    <label htmlFor="search-input">Employee Name</label>
                    <InputGroup className="mb-3">
                        <FormControl
                            id="search-input"
                            placeholder="Type name here"
                            aria-label="Type name here"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary">Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default SearchComponent;
