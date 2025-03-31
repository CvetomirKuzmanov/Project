import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || '',
    isAuthenticated: !!localStorage.getItem('token')
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
            localStorage.setItem('token', action.payload);
        },
        clearToken: (state) => {
            state.token = '';
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
        initializeAuth: (state) => {
            const token = localStorage.getItem('token');
            state.token = token || '';
            state.isAuthenticated = !!token;
        }
    }
});

export const { setToken, clearToken, initializeAuth } = authSlice.actions;
export default authSlice.reducer; 