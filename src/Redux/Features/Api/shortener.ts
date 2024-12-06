import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";


export const shortenerApi = createApi({
    reducerPath: "shortener",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1",
        prepareHeaders: (headers) => {
            const token = Cookies.get("accessToken");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        statusGetDomain: builder.query({
            query: (user_Name) => {
                return {
                    url: `/check-status`,
                    method: "GET",
                    params: { user_Name }, 
                };
            },
        }),
         generateDomain: builder.mutation({
            query: (generateInfo) => ({
                url: "/generate_shortener",
                method: "POST",
                body: generateInfo,
            }),
        }),
        paymentShortener: builder.mutation({
            query: (shortenerPayment) =>({
                url: "/payment-shortener",
                method: "POST",
                body: shortenerPayment,
            })
        }),

        listOfShortener: builder.query({
            query: (infoList) => {
                return {
                    url: '/shortener-listof-domain',
                    method: "GET",
                    params: infoList, 
                };
            },
        }),
        deletedLimitedDomain: builder.mutation({
            query: (info) => {
                 console.log(info)
             return {
                url: "/deleted-list-domain",
                method: "DELETE",  
                params: { id: info.id },
             }
            },
          }),

    }),


});

export const { useStatusGetDomainQuery , useGenerateDomainMutation, usePaymentShortenerMutation, useListOfShortenerQuery, useDeletedLimitedDomainMutation} = shortenerApi;
export default shortenerApi;
