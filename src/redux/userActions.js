import { usersTypes } from "../constants/reduxActionTypes";

export const getUsersData = () => {
    return { type: usersTypes.GET_USERS_DATA };
};

export const setUsers = data => ({ type: usersTypes.SET_USERS, payload: data });

export const createUser = data => ({
    type: usersTypes.CREATE_USER,
    payload: data
});
export const updateUser = data => ({
    type: usersTypes.UPDATE_USER,
    payload: data
});
export const findUsers = name => ({
    type: usersTypes.SEARCH_USERS,
    payload: name
});
export const deleteUser = user => ({
    type: usersTypes.DELETE_USER,
    payload: user.id
});
