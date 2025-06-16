import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetProfileQuery } from "@/redux/apiSlice/profile/profile";
import Loading from "@/components/layout/shared/Loading";
import { Edit } from "lucide-react";
import { GetProfileImageUrl } from "@/components/layout/shared/GetProfileImageUrl";

type ProfileFormData = {
  name: string;
  email: string;
};

export default function Profile() {
  const { data, isLoading, isFetching } = useGetProfileQuery(undefined);

  const form = useForm<ProfileFormData>({});

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.name,
        email: data.data.email,
      });
    }
  }, [form, data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isFetching) {
    return <p>data is Loading</p>;
  }

  return (
    <div className="flex justify-center items-center text-[#1A1E25]">
      <div className="w-[1035px] mx-auto">
        <div className="flex items-center justify-between gap-4 mt-12">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                className="w-24 h-24 rounded-full border-2 border-[#8AC2FF]"
                alt="profile"
                src={GetProfileImageUrl(data?.data?.profile)}
              />
            </div>

            <div>
              <h3 className="font-semibold text-2xl">{data?.data?.name}</h3>
            </div>
          </div>
          <div>
            <Link to="/edit-profile">
              <Button className="flex items-center justify-center space-x-2 cursor-pointer h-10 w-36 text-black bg-[#fdead8] hover:bg-[#fdead8]">
                <Edit />
                <span className="text-base">Edit Profile</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-9">
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Name" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Your Email"
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
