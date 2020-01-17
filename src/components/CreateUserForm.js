import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const CreateUserForm = ({ onClose, onSubmit }) => {
    const createUserObj = (e)=>{
        e.preventDefault();
        const{empID,empName,empActive,empDepartment}=e.target.elements;
        debugger
        onSubmit({empID:empID.value,empName:empName.value,empActive:!!empActive.checked,empDepartment:empDepartment.value});
    }
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
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="empActive">
                <Form.Label column sm={4}>
                    isActive
                </Form.Label>
                <Col sm={8} className="d-flex align-items-center">
                    <Form.Check name="empActive" />
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
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col className="d-flex justify-content-around" sm={4}>
                    <Button type="submit" variant="secondary">
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
