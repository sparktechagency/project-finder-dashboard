import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import {
  useGetProfileQuery,
  useUpdateEditProfileMutation,
} from "@/redux/apiSlice/profile/profile";
import toast from "react-hot-toast";
import Loading from "@/components/layout/shared/Loading";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "@/redux/api/baseApi";

type ProfileFormData = {
  name: string;
  email: string;
};

export default function EditProfile() {
  const [updateEditProfile] = useUpdateEditProfileMutation();
  const { data, isLoading, refetch } = useGetProfileQuery(undefined);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const form = useForm<ProfileFormData>({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (!data?.data) return;

    const profileData = data.data;
    form.reset({
      name: profileData.name,
      email: profileData.email,
    });

    if (profileData.profile) {
      const profileUrl = profileData.profile.startsWith("http")
        ? profileData.profile
        : `${imageUrl}${profileData.profile}`;

      setPreviewUrl(profileUrl);
    }
  }, [data, form]);

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);

    if (image) {
      formData.append("image", image);
    }
    try {
      await updateEditProfile(formData);
      toast.success("Profile updated successfully");
      navigate("/profile");
      refetch();
    } catch {
      toast.error("Update failed");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center text-[#1A1E25]">
      <div className="w-[1035px] mx-auto">
        <div className="flex items-center justify-between gap-4  mt-12">
          <div className="flex items-center gap-4">
            <div className="relative  ">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="w-24 h-24 rounded-full border border-gray-500 object-cover"
                />
              ) : (
                <div className="w-[90%] h-[90%] flex items-center justify-center text-gray-400 text-base">
                  No Image
                </div>
              )}

              <label
                htmlFor="profile-image-upload"
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer hover:bg-gray-200 transition"
                title="Change Profile Image"
              >
                <Edit className="w-5 h-5 text-gray-700" />
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleUploadImage}
                  className="hidden"
                />
              </label>
            </div>

            {/* <div>
              <h3 className="font-semibold text-2xl">jahid</h3>
            </div> */}
          </div>
        </div>

        <div className="mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-[#F79535] hover:bg-[#F79535] text-black font-medium text-lg px-6 w-full mt-4 h-10 cursor-pointer"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
