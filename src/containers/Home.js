import React, { useEffect, useState } from "react";
import TableUsers from "../components/TableUsers";
import { ModalComponent } from "../components/ModalComponent";
import Container from "react-bootstrap/Container";
import SearchComponent from "../components/SearchComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import firebase from "../firebase";
import EditForm from "../components/EditForm";

const Home = () => {
    const [modalIsShown, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [users, setUsers] = useState([]);

    const showModal = () => {
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
        setModalContent(null);
    };

    const createUser = newUser => {
        firebase
            .firestore()
            .collection("users")
            .add(newUser);
        closeModal();
    };

    const updateUser = newUserData => {
        firebase
            .firestore()
            .collection("users")
            .doc(newUserData.id)
            .set(newUserData);
        closeModal();
    };

    const deleteUser = user => {
        firebase
            .firestore()
            .collection("users")
            .doc(user.id)
            .delete();
    };

    const showUserInfo = user => {
        setModalContent(user);
        showModal();
    };

    const showUserForm = user => {
        setModalContent(
            <EditForm
                onClose={closeModal}
                onSubmit={(e, data) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateUser(data);
                }}
                user={user}
            />
        );
        showModal();
    };

    const onUserSearch = (name)=>{
        const fetchData = async () => {
            try{
            const db = firebase.firestore();
            const data = await db.collection("users").get();
            setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            }catch (e) {
                console.log('User searching goes bad:',e)
            }
        };
        fetchData();
    }

    useEffect(() => {
        const db = firebase.firestore();
        return db
            .collection("users")
            .onSnapshot(snapshot =>
                setUsers(
                    snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                )
            );
    }, []);

    return (
        <Container>
            <Row>
                <SearchComponent />
                <Col>
                    <TableUsers
                        users={users}
                        showUserInfo={showUserInfo}
                        showUserForm={showUserForm}
                        deleteUser={deleteUser}
                    />
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
