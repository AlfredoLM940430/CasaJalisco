import { configureStore } from "@reduxjs/toolkit";
import { lottoSlice } from "./lotto/lottoSlice";
import { authSlice } from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        lotto: lottoSlice.reducer,
        auth: authSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});