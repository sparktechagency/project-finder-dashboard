import { api } from "@/redux/api/baseApi";

const projects = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: "/apartment",
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

    getProjectsFloor: builder.query({
      query: () => ({
        url: "/floor",
        method: "GET",
      }),
      providesTags: ["package"],
    }),

    createProjectFloor: builder.mutation({
      query: (data) => {
        return {
          url: "/floor/create",
          method: "POST",
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
  useGetProjectsFloorQuery,
  useCreateProjectFloorMutation,
  useDeleteProjectMutation,
} = projects;
