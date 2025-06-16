import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "@/redux/apiSlice/auth/auth";
import toast from "react-hot-toast";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function ResetPasswordForm() {
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();

  type FormData = {
    newPassword: string;
    confirmPassword: string;
  };

  const onSubmit = async (formData: FormData) => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };

    try {
      await resetPassword({ token, data }).unwrap();
      toast.success("reset password successfully");
      navigate("/login");
    } catch (error: unknown) {
      toast.error(
        (error as any)?.data?.message ||
          (error as Error)?.message ||
          "Failed to reset password"
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="bg-[#F6F6F6] text-[#1A1E25] p-7 rounded-md">
        <CardContent className="w-[550px]">
          <div className="text-center space-y-3 my-7">
            <h1 className="text-3xl font-medium mt-2">Set New Password</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Label className="text-[#1A1E25] text-xl">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                placeholder="Enter new password"
                type={`${isPasswordVisible ? "text" : "password"}`}
                className="h-12 px-6  bg-[#F6F6F6] border border-[#1A1E25] text-[#1A1E25]"
                {...register("newPassword", { required: true })}
              />

              <span
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="text-slate-400 absolute right-3 top-3 cursor-pointer"
              >
                {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
              </span>
            </div>

            <Label className="text-[#1A1E25] text-xl">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                placeholder="Enter confirm password"
                type={`${isPasswordVisible2 ? "text" : "password"}`}
                className="h-12 px-6 bg-[#F6F6F6] border border-[#1A1E25] text-[#1A1E25]"
                {...register("confirmPassword", { required: true })}
              />

              <span
                onClick={() => setIsPasswordVisible2(!isPasswordVisible2)}
                className="text-slate-400 absolute right-3 top-3 cursor-pointer"
              >
                {isPasswordVisible2 ? <EyeOffIcon /> : <EyeIcon />}
              </span>
            </div>

            <Button
              type="submit"
              className="bg-[#F79535] px-6 w-full mt-4 h-10 cursor-pointer hover:bg-[#F79535]"
            >
              Confirm
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
