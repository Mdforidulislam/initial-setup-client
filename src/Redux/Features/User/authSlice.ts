import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { decodedToken } from "../../../Utils/TokenDecode";

interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
  user_Name: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: !!Cookies.get("accessToken"),
  userRole: null,
  user_Name: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        token: string;
        userRole: string;
        user_Name: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.userRole = action.payload.userRole;
      state.user_Name = action.payload.user_Name;
      state.loading = false;
      Cookies.set("accessToken", action.payload.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
      state.loading = false;
      Cookies.remove("accessToken");
    },
    initializeAuth: (state) => {
      const token = Cookies.get("accessToken");
      if (!token) {
        state.isAuthenticated = false;
        state.userRole = null;
        state.user_Name = null;
      } else {
        try {
          const decodedTokenA = decodedToken(token);
          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedTokenA?.exp > currentTime) {
            state.isAuthenticated = true;
            state.userRole = decodedTokenA.user_role;
            state.user_Name = decodedTokenA.user_Name;
          } else {
            Cookies.remove("accessToken");
            state.isAuthenticated = false;
            state.userRole = null;
            state.user_Name = null;
          }
        } catch {
          Cookies.remove("accessToken");
          state.isAuthenticated = false;
          state.userRole = null;
          state.user_Name = null;
        }
      }
      state.loading = false;
    },
  },
});

export const { setAuth, clearAuth, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
