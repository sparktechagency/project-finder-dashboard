import { api } from "@/redux/api/baseApi";

const projects = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ page }) => ({
        url: `/apartment?page=${page}`,
        method: "GET",
      }),
      providesTags: ["package"],
    }),

    createProject: builder.mutation({
      query: (data) => ({
        url: "/apartment/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["package"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/apartment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["package"],
    }),
    updateProject: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/apartment/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["package"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} = projects;
