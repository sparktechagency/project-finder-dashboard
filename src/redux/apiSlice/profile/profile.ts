import { api } from "@/redux/api/baseApi";

const profile = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/user/profile",
      }),
    }),

    updateEditProfile: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "PATCH",
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateEditProfileMutation,
  useChangePasswordMutation,
} = profile;
