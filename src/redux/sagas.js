import { takeEvery, put, call } from "redux-saga/effects";
import { departmentTypes, usersTypes } from "../constants/reduxActionTypes";
import firebase from "../firebase";
import { getUsersData, setUsers } from "./userActions";
import { getDepartmentsArray, setDepartments } from "./departmentActions";
import { ejectUsersData } from "../helpers/dataMapHelper";
import { all } from "@redux-saga/core/effects";

function createUser(newUser) {
    return firebase
        .firestore()
        .collection("users")
        .add(newUser);
}

function updateUserData(newUserData) {
    return firebase
        .firestore()
        .collection("users")
        .doc(newUserData.id)
        .set(newUserData);
}

function fetchData() {
    const db = firebase.firestore();
    return db.collection("users").get();
}

function deleteUser(id) {
    return firebase
        .firestore()
        .collection("users")
        .doc(id)
        .delete();
}

function findFireBaseUsers(name) {
    const db = firebase.firestore();
    return name
        ? db
              .collection("users")
              .where("empName", "==", name)
              .get()
        : db.collection("users").get();
}

function getDepartments(usersData) {
    return [...new Set(usersData.map(user => user.empDepartment))];
}

function* workerGetUsers() {
    const data = yield call(fetchData);
    const usersData = ejectUsersData(data);
    yield put(setUsers(usersData));
    yield put(getDepartmentsArray(usersData));
}

function* watchGetUsers() {
    yield takeEvery(usersTypes.GET_USERS_DATA, workerGetUsers);
}

function* workerDeleteUser({ payload }) {
    yield call(deleteUser, payload);
    yield put(getUsersData());
}

function* watchDeleteUser() {
    yield takeEvery(usersTypes.DELETE_USER, workerDeleteUser);
}

function* workerCreateUser({ payload }) {
    yield call(createUser, payload);
    yield put(getUsersData());
}

function* watchCreateUser() {
    yield takeEvery(usersTypes.CREATE_USER, workerCreateUser);
}

function* workerEditUser({ payload }) {
    yield call(updateUserData, payload);
    yield put(getUsersData());
}

function* watchUpdateUser() {
    yield takeEvery(usersTypes.UPDATE_USER, workerEditUser);
}

function* workerSearchUsers({ payload }) {
    const data = yield call(findFireBaseUsers, payload);
    const usersData = ejectUsersData(data);
    yield put(setUsers(usersData));
}

function* watchSearchUsers() {
    yield takeEvery(usersTypes.SEARCH_USERS, workerSearchUsers);
}

function* workerGetDepartments({ payload }) {
    const departments = yield call(getDepartments, payload);
    yield put(setDepartments(departments));
}

function* watchGetDepartments() {
    yield takeEvery(departmentTypes.GET_DEPARTMENTS, workerGetDepartments);
}

export function* rootSaga() {
    yield all([
        watchGetUsers(),
        watchDeleteUser(),
        watchCreateUser(),
        watchUpdateUser(),
        watchGetDepartments(),
        watchSearchUsers()
    ]);
}
