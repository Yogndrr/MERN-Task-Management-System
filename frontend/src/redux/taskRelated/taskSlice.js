import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    taskDetails: [],
    tasksList: [],
    loading: false,
    error: null,
    response: null,
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        onRequest: (state) => {
            state.loading = true;
        },
        tasksListSuccess: (state, action) => {
            state.loading = false;
            state.tasksList = action.payload;
            state.response = null;
            state.error = null;
        },
        taskDetailsSuccess: (state, action) => {
            state.loading = false;
            state.taskDetails = action.payload;
            state.response = null;
            state.error = null;
        },
        apiSuccess: (state) => {
            state.loading = false;
            state.response = null;
            state.error = null;
        },
        apiFailed: (state, action) => {
            state.loading = false;
            state.response = action.payload;
            state.error = null;
        },
        apiError: (state, action) => {
            state.loading = false;
            state.response = null;
            state.error = action.payload;
        }
    },
});

export const {
    onRequest,
    apiSuccess,
    tasksListSuccess,
    taskDetailsSuccess,
    apiFailed,
    apiError
} = taskSlice.actions;

export const taskReducer = taskSlice.reducer;