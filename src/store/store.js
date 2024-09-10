import { configureStore } from "@reduxjs/toolkit";
import { lottoSlice } from "./lotto/lottoSlice";
import { authSlice } from "./auth/authSlice";
import { adminSlice } from "./admin/adminSlice";

export const store = configureStore({
    reducer: {
        lotto: lottoSlice.reducer,
        auth: authSlice.reducer,
        admin: adminSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});