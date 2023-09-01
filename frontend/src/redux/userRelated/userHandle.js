import axios from 'axios';
import {
    authRequest,
    authSuccess,
    authFailed,
    authError,
    userDetailsSuccess,
    onRequest,
    doneSuccess,
    getFailed,
    getError,
    addedSuccess,
    employeesListSuccess,
    employeeDetailsSuccess,
} from './userSlice';

export const authHandler = (fields, role, mode) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${role}${mode}`, fields);
        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(authSuccess(result.data));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};

export const addStuff = (address, fields, token) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${address}`, fields, {
            headers: { Authorization: token }
        })
        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(addedSuccess());
        }
    } catch (error) {
        dispatch(authError(error));
    }
};

export const getUserDetails = (address, token) => async (dispatch) => {
    dispatch(onRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}`, {
            headers: { Authorization: token }
        });

        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(userDetailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const multipleDeleteHandler = (address, token) => async (dispatch) => {
    dispatch(onRequest());

    try {
        const result = await axios.delete(`${process.env.REACT_APP_BASE_URL}/${address}`, {
            headers: { Authorization: token }
        });

        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(doneSuccess());
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const singleDeleteHandler = (address, id, token) => async (dispatch) => {
    dispatch(onRequest());

    try {
        const result = await axios.delete(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, {
            headers: { Authorization: token }
        });

        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(doneSuccess());
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const updateUser = (fields, token, address) => async (dispatch) => {
    dispatch(onRequest());

    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}`, fields, {
            headers: {
                Authorization: token
            }
        });

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(authSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getAllEmployees = (address, token) => async (dispatch) => {
    dispatch(onRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}`, {
            headers: { Authorization: token }
        });

        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(employeesListSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const getEmployeeDetails = (address, id, token) => async (dispatch) => {
    dispatch(onRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, {
            headers: { Authorization: token }
        });

        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(employeeDetailsSuccess(result.data));
        }

    } catch (error) {
        dispatch(getError(error));
    }
};