import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { clearAuth } from "../User/authSlice";


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://fast-project-server.vercel.app/api/v1",
        prepareHeaders: (headers) => {
            const token = Cookies.get("accessToken");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (newUser) => {
                // Log the newUser data here
                console.log("User data before sending:", newUser);

                return {
                    url: "/create-user",
                    method: "POST",
                    body: { user: newUser }, // Pass the newUser data directly
                };
            },
        }),
        loginUser: builder.mutation({
            query: (creadentials)=>{
                console.log("login inof ", creadentials);
                return {
                    url: "/auth",
                    method: "POST",
                    body: creadentials,
                }
            }
        }),
        logOutUser: builder.mutation({
            query: () => ({
                url: "/logOut",
                method: "POST",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log("Logout successful:", data);
                    Cookies.remove("accessToken"); // Clear token from cookies
                    dispatch(clearAuth()); // Clear authentication state
                } catch (error) {
                    console.error("Logout failed:", error);
                }
            },
        }),

        getingUser: builder.query({
            query: () => ({
                url: "/user-get", 
                method: "GET",
            }),
        }),

        getingAllUser : builder.query({
            query: ()=>({
                url: "/get-alluser",
                method: 'GET'
            })
        })
        , 
        emailRequest: builder.query({
            query: ()=>({
                url: "/email-get",
                method: 'GET'
            })
        })
    }),
});

export const { useCreateUserMutation , useLoginUserMutation , useLogOutUserMutation , useGetingUserQuery, useGetingAllUserQuery, useEmailRequestQuery} = userApi;
export default userApi;
