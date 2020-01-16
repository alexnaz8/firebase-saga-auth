import React, {useEffect, useState} from 'react';
import TableUsers from "./TableUsers";
import {ModalComponent} from "./ModalComponent";
import Container from "react-bootstrap/Container";
import SearchComponent from "./SearchComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import firebase from "../firebase";

const Home = () => {
    const [modalIsShown, setModalShow] = useState(false);
const [users, setUsers] = useState([]);
    const toggleModal = () => setModalShow(!modalIsShown);
useEffect(()=>{
    const fetchData=async ()=>{
        const db = firebase.firestore()
        const data = await db.collection('users').get()
        setUsers(data.docs.map(doc=>({...doc.data(),id:doc.id })))
    }
    fetchData();
},[])
    return (
        <Container>
            <Row>
            <SearchComponent/>
            <Col>
            <TableUsers users={users}/>
            </Col>
            <ModalComponent user={null} showModal={modalIsShown} toggleModal={toggleModal}/>
            </Row>
            </Container>
    );
};

export default Home;
