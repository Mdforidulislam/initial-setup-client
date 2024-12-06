
import { configureStore } from "@reduxjs/toolkit";
import userApi from "../Features/Api/userApi";
import authReducer from '../Features/User/authSlice';
import shortenerApi from "../Features/Api/shortener";


export const  store = configureStore({
    reducer: {
        [userApi.reducerPath] : userApi.reducer,
        [shortenerApi.reducerPath] : shortenerApi.reducer,
        auth: authReducer,
    },
    middleware: (getdefaultMiddleware) => getdefaultMiddleware()
    .concat(userApi.middleware)
    .concat(shortenerApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;



