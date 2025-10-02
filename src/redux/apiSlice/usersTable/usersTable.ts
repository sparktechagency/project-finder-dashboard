import { api } from "@/redux/api/baseApi";


const usersTable = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: () => ({
                url: "/admin/all-user-list",
                method: "GET",
            }),
            providesTags: ["users"],
        }),
    }),
});
export const {
    useGetAllUserQuery,
} = usersTable;
