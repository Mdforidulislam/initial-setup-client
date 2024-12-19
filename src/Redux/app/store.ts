
import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../Features/User/authSlice';



export const  store = configureStore({
    reducer: {

        auth: authReducer,
    },
    middleware: (getdefaultMiddleware) => getdefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;



