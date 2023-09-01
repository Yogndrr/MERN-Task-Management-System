import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    currentUser: JSON.parse(localStorage.getItem('user')) || null,
    currentRole: (JSON.parse(localStorage.getItem('user')) || {}).role || null,
    error: null,
    response: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminRequest: (state) => {
            state.status = 'loading';
        },
        underControl: (state) => {
            state.status = 'idle';
            state.response = null;
            state.error = null;
        },
        adminSuccess: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.currentUser = action.payload;
            state.currentRole = action.payload.role;
            state.status = 'success';
            state.response = null;
            state.error = null;
        },
        adminFailed: (state, action) => {
            state.status = 'failed';
            state.response = action.payload;
            state.error = null;
        },
        adminError: (state, action) => {
            state.status = 'error';
            state.response = null;
            state.error = action.payload;
        },
        adminLogout: (state) => {
            localStorage.removeItem('user');
            state.currentUser = null;
            state.currentRole = null;
            state.status = 'idle';
            state.response = null;
            state.error = null;
        }
    },
});

export const {
    adminRequest,
    underControl,
    adminSuccess,
    adminFailed,
    adminError,
    adminLogout,
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
