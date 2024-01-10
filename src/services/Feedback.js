import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IP, KEY_TOKEN } from "../Utils/constants";

// Define a service using a base URL and expected endpoints

export const fbApi = createApi({
  reducerPath: "fbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dao-applicationservice.onrender.com/api/v1/feedback`,
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
    createFeedback: builder.mutation({
      query: (payload) => ({
        url: "/create",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    getAllFb: builder.mutation({
      query: ({ id }) => ({
        url: `/getAllFeedbacks/${id}`,
      }),
    }),
    deleteFb: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useCreateFeedbackMutation,
  useDeleteFbMutation,
  useGetAllFbMutation,
} = fbApi;
