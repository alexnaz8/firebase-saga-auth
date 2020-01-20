import { departmentTypes } from "../constants/reduxActionTypes";

export const getDepartmentsArray = usersData => ({
    type: departmentTypes.GET_DEPARTMENTS,
    payload: usersData
});

export const setDepartments = departments => ({
    type: departmentTypes.SET_DEPARTMENTS,
    payload: departments
});
