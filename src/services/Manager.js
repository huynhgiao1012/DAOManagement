import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IP, KEY_TOKEN } from "../Utils/constants";

// Define a service using a base URL and expected endpoints

export const managerApi = createApi({
  reducerPath: "managerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dao-applicationservice.onrender.com/api/v1/manager`,
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
    getAllMechanic: builder.mutation({
      query: () => ({
        url: "/getAllMechanic",
      }),
    }),
    getAllAccountant: builder.mutation({
      query: () => ({
        url: "/getAllAccountant",
      }),
    }),
    getAllEmployee: builder.mutation({
      query: () => ({
        url: "/getAllEmployee",
      }),
    }),
    getAllServiceMa: builder.mutation({
      query: () => ({
        url: "/getAllServiceMa",
      }),
    }),
    getEmergencyForm: builder.mutation({
      query: () => ({
        url: "/getEmergencyForm",
      }),
    }),
    getAllForm: builder.mutation({
      query: () => ({
        url: "/getAllForm",
      }),
    }),
    getCustomer: builder.mutation({
      query: () => ({
        url: "/getCustomer",
      }),
    }),
    getAllFeedback: builder.mutation({
      query: () => ({
        url: "/getAllFeedback",
      }),
    }),
    getMaintenanceForm: builder.mutation({
      query: () => ({
        url: "/getMaintenanceForm",
      }),
    }),
    getNewMaintenanceForm: builder.mutation({
      query: () => ({
        url: "/getNewMaintenanceForm",
      }),
    }),
    getSubService: builder.mutation({
      query: ({ id }) => ({
        url: `/getSubService/${id}`,
      }),
    }),
    getNumForm: builder.mutation({
      query: ({ id }) => ({
        url: `/getNumForm/${id}`,
      }),
    }),
    getGarageId: builder.mutation({
      query: () => ({
        url: "/getGarageId",
      }),
    }),
    getGarageDetail: builder.mutation({
      query: () => ({
        url: `/getGarageDetail`,
      }),
    }),
    formConfirm: builder.mutation({
      query: ({ id }) => ({
        url: `/formConfirm/${id}`,
        method: "POST",
      }),
    }),
    updateForm: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/updateForm/${id}`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    updateGarage: builder.mutation({
      query: (payload) => ({
        url: `/updateGarage`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    updateIsVip: builder.mutation({
      query: ({ id }) => ({
        url: `/updateIsVip/${id}`,
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    resetMePoint: builder.mutation({
      query: ({ id }) => ({
        url: `/resetMePoint/${id}`,
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    createMechanicAccount: builder.mutation({
      query: (payload) => ({
        url: `/createMechanicAccount`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    createAccountantAccount: builder.mutation({
      query: (payload) => ({
        url: `/createAccountantAccount`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    createEmergencyForm: builder.mutation({
      query: (payload) => ({
        url: `/createEmergencyForm`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    createService: builder.mutation({
      query: (payload) => ({
        url: `/createService`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    checkAccount: builder.mutation({
      query: (payload) => ({
        url: `/checkAccount`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    createSubService: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/createSubService/${id}`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    updateService: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/updateService/${id}`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    updateSubService: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/updateSubService/${id}`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    deleteMechanic: builder.mutation({
      query: ({ id }) => ({
        url: `/deleteMechanic/${id}`,
        method: "DELETE",
      }),
    }),
    deleteForm: builder.mutation({
      query: ({ id }) => ({
        url: `/deleteForm/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllAccountantMutation,
  useGetAllEmployeeMutation,
  useGetAllMechanicMutation,
  useGetAllServiceMaMutation,
  useGetEmergencyFormMutation,
  useGetMaintenanceFormMutation,
  useGetSubServiceMutation,
  useCreateAccountantAccountMutation,
  useCreateEmergencyFormMutation,
  useCreateMechanicAccountMutation,
  useCreateServiceMutation,
  useCreateSubServiceMutation,
  useFormConfirmMutation,
  useUpdateFormMutation,
  useUpdateGarageMutation,
  useUpdateIsVipMutation,
  useDeleteMechanicMutation,
  useUpdateServiceMutation,
  useUpdateSubServiceMutation,
  useGetAllFormMutation,
  useGetGarageDetailMutation,
  useGetGarageIdMutation,
  useGetNewMaintenanceFormMutation,
  useCheckAccountMutation,
  useDeleteFormMutation,
  useGetAllFeedbackMutation,
  useGetCustomerMutation,
  useGetNumFormMutation,
  useResetMePointMutation,
} = managerApi;
