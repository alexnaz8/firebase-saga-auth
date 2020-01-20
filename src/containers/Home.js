import React, { useEffect, useState } from "react";
import TableUsers from "../components/TableUsers";
import ModalComponent from "../components/ModalComponent";
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
import { clearModalContent, setModalContent } from "../redux/modalActions";
import {
    createUser,
    updateUser,
    deleteUser,
    getUsersData,
    findUsers
} from "../redux/userActions";

const Home = ({
    currentUser,
    setModalContent,
    clearModalContent,
    users,
    getUsersData,
    createUser,
    updateUserData,
    deleteUser,
    departments,
    findUsers
}) => {
    const [modalIsShown, setModalShow] = useState(false);
    const [itemsPerPage, setPerPageValue] = useState(4);
    const [activePage, setActivePage] = useState(1);
    const [usersForCurrentPage, setUsersForCurrentPage] = useState([]);
    const showModal = () => {
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
        clearModalContent();
    };

    const updateUser = newUserData => {
        updateUserData(newUserData);
        closeModal();
    };

    const showUserInfo = user => {
        setModalContent({ title: "User info", content: user });
        showModal();
    };

    const showEditUserForm = user => {
        setModalContent({
            title: "Edit User",
            content: (
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
            content: (
                <CreateUserForm
                    onClose={closeModal}
                    onSubmit={createUser}
                    departments={departments}
                />
            )
        });
        showModal();
    };

    const onUserSearch = name => {
        findUsers(name);
    };

    const logOut = () => {
        firebase.auth().signOut();
    };
    useEffect(() => {
        getUsersData();
    }, []);

    //firebase WS part
    /*    useEffect(() => {
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
    }, []);*/

    useEffect(() => {
        const pagedUsersArray = users.slice(
            itemsPerPage * activePage - itemsPerPage,
            itemsPerPage * activePage
        );

        if (!pagedUsersArray.length && activePage > 1) {
            setActivePage(activePage - 1);
        } else {
            setUsersForCurrentPage(pagedUsersArray);
        }
    }, [users, activePage, itemsPerPage]);

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
                    showModal={modalIsShown}
                    closeModal={closeModal}
                />
            </Row>
        </Container>
    ) : null;
};

const mapStateToProps = ({ auth, data, departments }) => ({
    currentUser: auth.currentUser,
    users: data.users,
    departments: departments.departments
});
const mapDispatchToProps = {
    setModalContent,
    clearModalContent,
    getUsersData,
    deleteUser,
    createUser,
    updateUserData: updateUser,
    findUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
