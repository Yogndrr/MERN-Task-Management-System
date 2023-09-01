import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { taskReducer } from './taskRelated/taskSlice';
import { adminReducer } from './adminRelated/adminSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        task: taskReducer,
        admin: adminReducer
    }
});

export default store;