
import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../Features/User/authSlice';
import dataReducer from '../Features/Data/dataSlice';



export const  store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer,
    },
    middleware: (getdefaultMiddleware) => getdefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;



