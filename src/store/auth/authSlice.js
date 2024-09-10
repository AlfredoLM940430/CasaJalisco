import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'cheking',
    user: {},
    errorMessage: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: { 
        onCheking: (state) => {
            state.status = 'cheking',
            state.user = {},
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated',
            state.user = payload,
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated',
            state.user = {},
            state.errorMessage = payload;
        },
        clearErrorMsg: (state) => {
            state.errorMessage = undefined;
        }
    },
});

export const { onCheking, onLogin, onLogout, clearErrorMsg } = authSlice.actions;