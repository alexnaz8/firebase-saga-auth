import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { makeCapitalized } from "../helpers/formHelper";

const CreateUserForm = ({ onClose, onSubmit }) => {
    const [empID, setID] = useState(0);
    const [name, setName] = useState("");
    const [isActive, setActive] = useState(false);
    const [department, setDepartment] = useState("");
    const createUserObj = e => {
        e.preventDefault();
        onSubmit({
            empID: empID,
            empName: name,
            empActive: isActive,
            empDepartment: department
        });
        setID(+empID + 1);
        setActive(false);
        setName("");
        setDepartment("");
    };
    return (
        <Form onSubmit={createUserObj}>
            <Form.Group as={Row} controlId="empID">
                <Form.Label column sm={4}>
                    empID
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        type="number"
                        name="empID"
                        placeholder="ID"
                        value={empID}
                        onChange={({ target }) => setID(target.value)}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="empName">
                <Form.Label column sm={4}>
                    empName
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        type="text"
                        name="empName"
                        placeholder="Name"
                        value={name}
                        onChange={({ target }) =>
                            setName(makeCapitalized(target.value))
                        }
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="empActive">
                <Form.Label column sm={4}>
                    isActive
                </Form.Label>
                <Col sm={8} className="d-flex align-items-center">
                    <Form.Check
                        name="empActive"
                        checked={isActive}
                        onChange={({ target }) => setActive(target.checked)}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="empDepartment">
                <Form.Label column sm={4}>
                    empDepartment
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        type="text"
                        name="empDepartment"
                        placeholder="Department"
                        value={department}
                        onChange={({ target }) => setDepartment(target.value)}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col className="d-flex justify-content-around" sm={4}>
                    <Button className="mx-2" type="submit" variant="secondary">
                        Create
                    </Button>
                    <Button variant="primary" onClick={onClose}>
                        Cancel
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default CreateUserForm;
