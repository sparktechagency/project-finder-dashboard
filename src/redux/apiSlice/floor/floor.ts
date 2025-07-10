import { api } from "@/redux/api/baseApi";

const floor = api.injectEndpoints({
  endpoints: (builder) => ({
    getFloor: builder.query({
      query: () => ({
        url: "/floor",
        method: "GET",
      }),
      providesTags: ["floor"],
    }),
    getSingleFloor: builder.query({
      query: (id) => ({
        url: `/floor/apartment/${id}`,
        method: "GET",
      }),
      providesTags: ["floor"],
    }),

    createFloor: builder.mutation({
      query: (data) => {
        return {
          url: "/floor/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["floor"],
    }),
    updateFloor: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/floor/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["floor"],
    }),

    deleteFloor: builder.mutation({
      query: (id) => ({
        url: `/floor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["floor"],
    }),
  }),
});

export const {
  useGetFloorQuery,
  useGetSingleFloorQuery,
  useCreateFloorMutation,
  useUpdateFloorMutation,
  useDeleteFloorMutation,
} = floor;
