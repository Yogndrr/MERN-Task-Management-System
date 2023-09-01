import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const initialState = {
    status: 'idle',
    loading: false,
    userDetails: [],
    employeeDetails: [],
    employeesList: [],
    currentUser: JSON.parse(localStorage.getItem('user')) || null,
    currentRole: (JSON.parse(localStorage.getItem('user')) || {}).role || null,
    currentToken: (JSON.parse(localStorage.getItem('user')) || {}).token || null,
    error: null,
    response: null,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authRequest: (state) => {
            state.status = 'loading';
        },
        authSuccess: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.currentUser = action.payload;
            state.currentRole = action.payload.role;
            state.currentToken = action.payload.token;
            state.status = 'success';
            state.response = null;
            state.error = null;
            state.isLoggedIn = true;
        },
        addedSuccess: (state) => {
            state.status = "added";
            state.response = null;
            state.error = null;
        },
        underControl: (state) => {
            state.status = 'idle';
            state.response = null;
            state.error = null;
        },
        authFailed: (state, action) => {
            state.status = 'failed';
            state.response = action.payload;
            state.error = null;
        },
        authError: (state, action) => {
            state.status = 'error';
            state.response = null;
            state.error = action.payload;
        },
        authLogout: (state) => {
            localStorage.removeItem('user');
            state.currentUser = null;
            state.currentRole = null;
            state.currentToken = null;
            state.status = 'idle';
            state.response = null;
            state.error = null;
            state.isLoggedIn = false;
        },
        isTokenValid: (state) => {
            const decodedToken = jwtDecode(state.currentToken);

            if (state.currentToken && decodedToken.exp * 1000 > Date.now()) {
                state.isLoggedIn = true;
            } else {
                localStorage.removeItem('user');
                state.currentUser = null;
                state.currentRole = null;
                state.currentToken = null;
                state.status = 'idle';
                state.response = null;
                state.error = null;
                state.isLoggedIn = false;
            }
        },

        onRequest: (state) => {
            state.loading = true;
            state.response = null;
            state.error = null;
        },
        doneSuccess: (state) => {
            state.loading = false;
            state.response = null;
            state.error = null;
        },
        userDetailsSuccess: (state, action) => {
            state.userDetails = action.payload;
            state.loading = false;
            state.response = null;
            state.error = null;
        },
        employeeDetailsSuccess: (state, action) => {
            state.employeeDetails = action.payload;
            state.loading = false;
            state.response = null;
            state.error = null;
        },
        employeesListSuccess: (state, action) => {
            state.employeesList = action.payload;
            state.loading = false;
            state.response = null;
            state.error = null;
        },
        getFailed: (state, action) => {
            state.loading = false;
            state.response = action.payload;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.response = null;
            state.error = action.payload;
        },
    },
});

export const {
    authRequest,
    authSuccess,
    addedSuccess,
    underControl,
    authFailed,
    authError,
    authLogout,
    isTokenValid,
    onRequest,
    doneSuccess,
    userDetailsSuccess,
    employeeDetailsSuccess,
    employeesListSuccess,
    getFailed,
    getError,
} = userSlice.actions;

export const userReducer = userSlice.reducer;