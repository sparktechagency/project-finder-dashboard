import { imageUrl } from "@/redux/api/baseApi";

export const GetProfileImageUrl = (profile: string) =>
  profile.startsWith("http") ? profile : `${imageUrl}${profile}`;
