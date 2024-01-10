import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IP, KEY_TOKEN } from "../Utils/constants";

// Define a service using a base URL and expected endpoints

export const vietQRApi = createApi({
  reducerPath: "vietQRApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.vietqr.io/v2`,
    prepareHeaders: async (headers, query) => {
      headers.set("x-client-id", `98f40497-19bc-4d97-9455-fbccd3f4a968`);
      headers.set("x-api-key", "f6e1b698-4724-40ed-bfc8-37d03899fbd8");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    lookupAccount: builder.mutation({
      query: (payload) => ({
        url: `/lookup`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-client-id": "98f40497-19bc-4d97-9455-fbccd3f4a968",
          "x-api-key": "f6e1b698-4724-40ed-bfc8-37d03899fbd8",
        },
      }),
    }),
  }),
});

export const { useLookupAccountMutation } = vietQRApi;
