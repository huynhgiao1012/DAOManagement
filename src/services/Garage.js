import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IP, KEY_TOKEN } from "../Utils/constants";

// Define a service using a base URL and expected endpoints

export const garageApi = createApi({
  reducerPath: "garageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dao-applicationservice.onrender.com/api/v1/garage`,
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
    getCorGarage: builder.mutation({
      query: () => ({
        url: "/getCorGarage",
      }),
    }),
    getGarageDetail: builder.mutation({
      query: ({ id }) => ({
        url: `/getGarageDetail/${id}`,
      }),
    }),
    getSpecificCorGarage: builder.mutation({
      query: () => ({
        url: "/getSpecificCorGarage",
      }),
    }),
    getAllGarage: builder.mutation({
      query: () => ({
        url: "/getAllGarage",
      }),
    }),
    getAllManager: builder.mutation({
      query: ({ id }) => ({
        url: `/getAllManager/${id}`,
      }),
    }),
    updateGarage: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/updateGarage/${id}`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    createGarage: builder.mutation({
      query: (payload) => ({
        url: `/create`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    createManagerAccount: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/createManagerAccount/${id}`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCorGarageMutation,
  useGetGarageDetailMutation,
  useGetSpecificCorGarageMutation,
  useGetAllGarageMutation,
  useUpdateGarageMutation,
  useCreateGarageMutation,
  useGetAllManagerMutation,
  useCreateManagerAccountMutation,
} = garageApi;
