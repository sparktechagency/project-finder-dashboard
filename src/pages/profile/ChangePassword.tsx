import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useChangePasswordMutation } from "@/redux/apiSlice/profile/profile";
import toast from "react-hot-toast";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePassword() {
  const [changePassword] = useChangePasswordMutation();

  const [isPasswordVisible, setIsPasswordVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await changePassword(data).unwrap();
      if (res.message) {
        reset();
        toast.success("change password successfull");
      } else {
        toast.error("Failed to change password. Please try again.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password. Please try again.");
    }
  };

  // Watch newPassword to validate confirmPassword matches
  const newPassword = watch("newPassword");

  return (
    <div className="flex flex-col mt-[6%]">
      <div className="flex items-center justify-center mt-10">
        <div className="w-full lg:w-2/3 rounded-xl pb-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label className="text-[#1A1E25] text-[20px] font-medium">
                Current password
              </Label>
              <div className="relative">
                <Input
                  type={isPasswordVisible.currentPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 bg-[#F6F6F6] placeholder:text-gray-400 rounded-xl border-none mt-1 text-[#1A1E25]"
                  {...register("currentPassword", {
                    required: "Please input your current password!",
                    minLength: {
                      value: 6,
                      message: "Current password must be at least 6 characters",
                    },
                  })}
                />
                <span
                  onClick={() =>
                    setIsPasswordVisible((prev) => ({
                      ...prev,
                      currentPassword: !prev.currentPassword,
                    }))
                  }
                  className="text-slate-400 absolute right-3 top-3 cursor-pointer"
                >
                  {isPasswordVisible.currentPassword ? (
                    <EyeOffIcon />
                  ) : (
                    <EyeIcon />
                  )}
                </span>
              </div>
              {errors.currentPassword && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <Label className="text-[#1A1E25] text-[20px] font-medium">
                New Password
              </Label>
              <div className="relative">
                <Input
                  type={isPasswordVisible.newPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  className="h-12 bg-[#F6F6F6] placeholder:text-gray-400 rounded-xl border-none mt-1 text-[#1A1E25] pr-10"
                  {...register("newPassword", {
                    required: "Please input your new password!",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <span
                  onClick={() =>
                    setIsPasswordVisible((prev) => ({
                      ...prev,
                      newPassword: !prev.newPassword,
                    }))
                  }
                  className="text-slate-400 absolute right-3 top-3 cursor-pointer"
                >
                  {isPasswordVisible.newPassword ? <EyeOffIcon /> : <EyeIcon />}
                </span>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <Label className="text-[#1A1E25] text-[20px] font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  type={isPasswordVisible.confirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className="h-12 bg-[#F6F6F6] placeholder:text-gray-400 rounded-xl border-none mt-1 text-[#1A1E25]"
                  {...register("confirmPassword", {
                    required: "Please confirm your new password!",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                />
                <span
                  onClick={() =>
                    setIsPasswordVisible((prev) => ({
                      ...prev,
                      confirmPassword: !prev.confirmPassword,
                    }))
                  }
                  className="text-slate-400 absolute right-3 top-3 cursor-pointer"
                >
                  {isPasswordVisible.confirmPassword ? (
                    <EyeOffIcon />
                  ) : (
                    <EyeIcon />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-[#F79535] hover:bg-[#F79535] text-black font-medium text-lg px-6 w-full mt-4 h-10 cursor-pointer"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
