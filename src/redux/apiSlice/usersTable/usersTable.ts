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
  }),
});
export const { useGetAllUserQuery } = usersTable;
