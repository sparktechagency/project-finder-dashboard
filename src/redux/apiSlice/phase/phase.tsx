import { api } from "@/redux/api/baseApi";

const phase = api.injectEndpoints({
  endpoints: (builder) => ({
    getPhaseDetails: builder.query({
      query: () => ({
        url: `/phase`,
        method: "GET",
      }),
      providesTags: ["package"],
    }),

    createPhaseDetails: builder.mutation({
      query: (data) => ({
        url: `/phase/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["package"],
    }),
  }),
});

export const { useGetPhaseDetailsQuery, useCreatePhaseDetailsMutation } = phase;
