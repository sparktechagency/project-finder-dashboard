import { api } from "@/redux/api/baseApi";

const projects = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ page, apartmentName }) => ({
        url: `/apartment?page=${page}&apartmentName=${apartmentName}`,
        method: "GET",
        // params: { page, apartmentName },
      }),
      providesTags: ["apartment"],
    }),

    getSingleApartment: builder.query({
      query: (id) => ({
        url: `/apartment/${id}`,
        method: "GET",
      }),
    }),

    createProject: builder.mutation({
      query: (data) => ({
        url: "/apartment/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["apartment"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/apartment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["apartment"],
    }),
    updateProject: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/apartment/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["apartment"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetSingleApartmentQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} = projects;
