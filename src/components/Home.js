import React, { useEffect, useState } from "react";
import TableUsers from "./TableUsers";
import { ModalComponent } from "./ModalComponent";
import Container from "react-bootstrap/Container";
import SearchComponent from "./SearchComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import firebase from "../firebase";
import EditForm from "./EditForm";

const Home = () => {
    const [modalIsShown, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState(null)
    const [users, setUsers] = useState([]);
    const showModal = () => {
        setModalShow(true);
    };
    const closeModal = () => {
        setModalShow(false);
        setModalContent(null)
    };

    const showUserInfo=(user)=>{
        setModalContent(user);
        setModalShow(true);
    }
    const showUserForm=()=>{
        setModalContent(<EditForm onClose = {closeModal} onSubmit={(e)=>{e.preventDefault(); e.stopPropagation();console.log(e.currentTarget)}}/>);
        setModalShow(true)
    }
    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await db.collection("users").get();
            setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Row>
                <SearchComponent />
                <Col>
                    <TableUsers users={users} showUserInfo={showUserInfo} showUserForm={showUserForm} />
                </Col>
                <ModalComponent
                    title={""}
                    bodyContent={modalContent}
                    showModal={modalIsShown}
                    closeModal={closeModal}
                />
            </Row>
        </Container>
    );
};

export default Home;
