import { api } from "@/redux/api/baseApi";

const phase = api.injectEndpoints({
  endpoints: (builder) => ({
    getPhaseDetails: builder.query({
      query: () => ({
        url: `/phase`,
        method: "GET",
      }),
      providesTags: ["phase"],
    }),

    getSinglePhase: builder.query({
      query: ({ id, page }) => ({
        url: `/floor/phases/${id}?page=${page}`,
        method: "GET",
      }),
      providesTags: ["phase"],
    }),

    createPhaseDetails: builder.mutation({
      query: (data) => ({
        url: `/phase/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["phase"],
    }),
    updatePhaseDetails: builder.mutation({
      query: ({ id, data }) => ({
        url: `/phase/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["phase"],
    }),

    deletePhase: builder.mutation({
      query: (id) => ({
        url: `/phase/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["phase"],
    }),
  }),
});

export const {
  useGetPhaseDetailsQuery,
  useGetSinglePhaseQuery,
  useCreatePhaseDetailsMutation,
  useUpdatePhaseDetailsMutation,
  useDeletePhaseMutation,
} = phase;
