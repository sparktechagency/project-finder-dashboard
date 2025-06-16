import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "@/redux/apiSlice/auth/auth";
import toast from "react-hot-toast";

type FormData = {
  email: string;
};

export default function ForgetPassword() {
  const [forgetPassword] = useForgetPasswordMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await forgetPassword(data).unwrap(); // unwrap to catch errors properly

      if (res?.success) {
        toast.success("Check your email");
        if (data.email)
          localStorage.setItem("email", JSON.stringify(data.email));
        navigate("/verify-otp");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Email is not verified");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="bg-[#F6F6F6] text-[#1A1E25] p-7 rounded-md">
        <CardContent className="w-[550px]">
          <div className="text-center space-y-3 my-7">
            <h1 className="text-3xl font-medium mt-2">Forget Password</h1>
            <p className="text-[#929292]">
              Please enter your email and password to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="text-[#1A1E25] text-xl">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 px-6 mt-2 bg-[#F6F6F6] border border-[#1A1E25] text-[#1A1E25]"
                {...register("email", { required: "Please enter your email!" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-[#F79535] px-6 w-full mt-4 h-10 cursor-pointer hover:bg-[#F79535]"
            >
              GET OTP
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
