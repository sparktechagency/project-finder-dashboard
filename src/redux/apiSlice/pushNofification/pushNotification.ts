import { api } from "@/redux/api/baseApi";

const pushNotification = api.injectEndpoints({
  endpoints: (builder) => ({
    createPushNotification: builder.mutation({
      query: (data) => ({
        url: "/push-notification/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const { useCreatePushNotificationMutation } = pushNotification;
