import { api } from "@/redux/api/baseApi";

const floor = api.injectEndpoints({
  endpoints: (builder) => ({
    getFloor: builder.query({
      query: () => ({
        url: "/floor",
        method: "GET",
      }),
      providesTags: ["package"],
    }),

    createFloor: builder.mutation({
      query: (data) => {
        return {
          url: "/floor/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["package"],
    }),
    updateFloor: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/floor/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["package"],
    }),
  }),
});

export const {
  useGetFloorQuery,
  useCreateFloorMutation,
  useUpdateFloorMutation,
} = floor;
