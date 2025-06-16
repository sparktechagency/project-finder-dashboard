import { api } from "@/redux/api/baseApi";

const settings = api.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => ({
        url: "/about",
        method: "GET",
      }),
    }),
    updateAbout: builder.mutation({
      query: (data) => ({
        url: "/about",
        method: "POST",
        body: data,
      }),
    }),

    getPrivacy: builder.query({
      query: () => ({
        url: "/privacy-policy",
        method: "GET",
      }),
    }),

    createPolicy: builder.mutation({
      query: (data) => ({
        url: "/privacy-policy/create",
        method: "POST",
        body: data,
      }),
    }),
    getConditions: builder.query({
      query: () => ({
        url: "/privacy-policy",
        method: "GET",
      }),
    }),

    createConditions: builder.mutation({
      query: (data) => ({
        url: "/privacy-policy",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAboutQuery,
  useUpdateAboutMutation,
  useGetPrivacyQuery,
  useCreatePolicyMutation,
} = settings;
