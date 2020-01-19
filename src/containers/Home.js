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
import { connect } from "react-redux";
import PaginationWrapper from "../components/PaginationWrapper";

const Home = ({ currentUser }) => {
    const [modalIsShown, setModalShow] = useState(false);
    const [modal, setModalContent] = useState({});
    const [users, setUsers] = useState([]);
    const [itemsPerPage, setPerPageValue] = useState(4);
    const [activePage, setActivePage] = useState(1);
    const [departments, setDepartments] = useState([]);
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
                    departments={departments}
                />
            )
        });
        showModal();
    };

    const showAddUserForm = () => {
        setModalContent({
            title: "Create User",
            modalContent: (
                <CreateUserForm onClose={closeModal} onSubmit={createUser} departments = {departments}/>
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

    const logOut = () => {
        firebase.auth().signOut();
    };

    useEffect(() => {
        const db = firebase.firestore();
        return db.collection("users").onSnapshot(snapshot => {
            const usersData = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setUsers(usersData);
            const departments = [
                ...new Set(usersData.map(user => user.empDepartment))
            ];
            setDepartments(departments);
        });
    }, []);

    const usersForCurrentPage = users.slice(
        itemsPerPage * activePage - itemsPerPage,
        itemsPerPage * activePage
    );

    return currentUser ? (
        <Container className={"my-3"}>
            <Row>
                <Container className="d-flex justify-content-center">
                    <h5>You are logged in as {currentUser.email}</h5>
                    <Button
                        className="mx-2"
                        variant="outline-secondary"
                        size="sm"
                        onClick={logOut}
                    >
                        LogOut
                    </Button>
                </Container>

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
                <PaginationWrapper
                    totalAmount={users.length}
                    itemsCountPerPage={itemsPerPage}
                    activePage={activePage}
                    setActivePage={setActivePage}
                >
                    <Col>
                        <TableUsers
                            users={usersForCurrentPage}
                            showUserInfo={showUserInfo}
                            showEditUserForm={showEditUserForm}
                            deleteUser={deleteUser}
                        />
                    </Col>
                </PaginationWrapper>
                <ModalComponent
                    title={modal.title}
                    bodyContent={modal.modalContent}
                    showModal={modalIsShown}
                    closeModal={closeModal}
                />
            </Row>
        </Container>
    ) : null;
};

const mapStateToProps = ({ auth }) => ({ currentUser: auth.currentUser });

export default connect(mapStateToProps)(Home);
