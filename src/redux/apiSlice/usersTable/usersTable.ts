import { api } from "@/redux/api/baseApi";

const usersTable = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: ({ page }) => ({
        url: `/admin/all-user-list?page=${page}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    approvedUser: builder.mutation({
      query: ({ userId, isAdminVerified }) => ({
        url: `/auth/admin-approval/${userId}`,
        method: "PATCH",
        body: { isAdminVerified },
      }),
      invalidatesTags: ["users"],
    }),
  }),
});
export const { useGetAllUserQuery, useApprovedUserMutation } = usersTable;
