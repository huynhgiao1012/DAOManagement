import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IP, KEY_TOKEN } from "../Utils/constants";

// Define a service using a base URL and expected endpoints

export const mechanicApi = createApi({
  reducerPath: "mechanicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dao-applicationservice.onrender.com/api/v1/mechanic`,
    prepareHeaders: async (headers, query) => {
      const Token = localStorage.getItem("token");
      if (Token) {
        headers.set("authorization", `Bearer ${Token}`);
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMePoint: builder.mutation({
      query: () => ({
        url: "/getMePoint",
      }),
    }),
    getForms: builder.mutation({
      query: () => ({
        url: "/getForms",
      }),
    }),
    getForms: builder.mutation({
      query: () => ({
        url: "/getForms",
      }),
    }),
    getPickedForms: builder.mutation({
      query: () => ({
        url: "/getPickedForms",
      }),
    }),
    pickForm: builder.mutation({
      query: ({ id }) => ({
        url: `/pickForm/${id}`,
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetMePointMutation,
  useGetFormsMutation,
  usePickFormMutation,
  useGetPickedFormsMutation,
} = mechanicApi;
