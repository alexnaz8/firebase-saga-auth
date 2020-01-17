import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const EditForm = ({ onClose, onSubmit, user }) => {
    const [name,setName] = useState(user.empName);
    const [isActive,setActive] = useState(user.empActive);
    const [department,setDepartment] = useState(user.empDepartment);
    return (
        <Form onSubmit={(e)=>onSubmit(e,{...user,empName:name,empActive:isActive})}>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={4}>
                    empName
                </Form.Label>
                <Col sm={8}>
                    <Form.Control type="text" placeholder="Name" name="empName" value = {name} onChange={({target})=>setName(target.value)}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalCheck">
                <Form.Label column sm={4}>
                    isActive
                </Form.Label>
                <Col sm={8} className="d-flex align-items-center">
                    <Form.Check checked={isActive} onChange={({target})=>{debugger;setActive(target.checked)}}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} sm={10} controlId="userForm.DepartmentSelect">
                <Form.Label column sm={4}>
                    empDepartment
                </Form.Label>
                <Col sm={8}>
                    <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col className="d-flex justify-content-around" sm={4}>
                    <Button type="submit" variant="secondary">
                        Save
                    </Button>
                    <Button variant="primary" onClick={onClose}>
                        Cancel
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    );
};

export default EditForm;