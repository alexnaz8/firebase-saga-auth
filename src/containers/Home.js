import React, { useEffect, useState } from "react";
import TableUsers from "../components/TableUsers";
import { ModalComponent } from "../components/ModalComponent";
import Container from "react-bootstrap/Container";
import SearchComponent from "../components/SearchComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import firebase from "../firebase";
import EditForm from "../components/EditForm";
import Button from "react-bootstrap/Button";
import CreateUserForm from "../components/CreateUserForm";

const Home = () => {
    const [modalIsShown, setModalShow] = useState(false);
    const [modal, setModalContent] = useState({});
    const [users, setUsers] = useState([]);

    const showModal = () => {
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
        setModalContent({});
    };

    const createUser = newUser => {
        firebase
            .firestore()
            .collection("users")
            .add(newUser);
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
        setModalContent({ modalTitle: "", modalContent: user });
        showModal();
    };

    const showEditUserForm = user => {
        setModalContent({
            title: "Edit User",
            modalContent: (
                <EditForm
                    onClose={closeModal}
                    onSubmit={updateUser}
                    user={user}
                />
            )
        });
        showModal();
    };

    const showAddUserForm = () => {
        setModalContent({
            title: "Create User",
            modalContent: (
                <CreateUserForm
                    onClose={closeModal}
                    onSubmit={createUser}
                />
            )
        });
        showModal();
    };

    const onUserSearch = name => {
        const fetchData = async () => {
            try {
                const db = firebase.firestore();
                const data = !!name
                    ? await db
                          .collection("users")
                          .where("empName", "==", name)
                          .get()
                    : await db.collection("users").get();
                setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            } catch (e) {
                console.log("User searching goes bad:", e);
            }
        };
        fetchData();
    };

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
                <SearchComponent onUserSearch={onUserSearch} />
                <Container className="pb-2">
                    <Button
                        type="button"
                        variant="light"
                        onClick={showAddUserForm}
                    >
                        Add Employee
                    </Button>
                </Container>
                <Col>
                    <TableUsers
                        users={users}
                        showUserInfo={showUserInfo}
                        showEditUserForm={showEditUserForm}
                        deleteUser={deleteUser}
                    />
                </Col>
                <ModalComponent
                    title={modal.title}
                    bodyContent={modal.modalContent}
                    showModal={modalIsShown}
                    closeModal={closeModal}
                />
            </Row>
        </Container>
    );
};

export default Home;
