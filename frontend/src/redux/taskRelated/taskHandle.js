import axios from 'axios';
import {
    onRequest,
    tasksListSuccess,
    taskDetailsSuccess,
    apiFailed,
    apiError,
    apiSuccess
} from './taskSlice';

export const getAllTasks = (address, token) => async (dispatch) => {
    dispatch(onRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}`, {
            headers: { Authorization: token }
        });

        if (result.data.message) {
            dispatch(apiFailed(result.data.message));
        } else {
            dispatch(tasksListSuccess(result.data));
        }
    } catch (error) {
        dispatch(apiError(error));
    }
}

export const getTaskDetails = (address, token, id) => async (dispatch) => {
    dispatch(onRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, {
            headers: { Authorization: token }
        });

        if (result.data) {
            dispatch(taskDetailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(apiError(error));
    }
};