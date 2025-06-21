import { api } from "@/redux/api/baseApi";

const auth = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, data }) => {
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: data,
          headers: {
            Authorization: token,
          },
        };
      },
    }),

    OtpVerify: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),

    resendOtp: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useOtpVerifyMutation,
  useResendOtpMutation,
} = auth;
