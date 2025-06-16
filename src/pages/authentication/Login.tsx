import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useLoginMutation } from "@/redux/apiSlice/auth/auth";
import toast from "react-hot-toast";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
type FormData = { email: string; password: string };

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();

  if (isLoading) {
    toast.loading("Loading...", { id: "login" });
  }

  const onSubmit = async (form: FormData) => {
    try {
      const result = await login(form).unwrap();
      toast.success("Login successful", { id: "login" });
      localStorage.setItem("accessToken", result.data.accessToken);
      navigate("/");
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.error || "Login failed. Please try again.",
        { id: "login" }
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="bg-[#F6F6F6] text-[#1A1E25] p-7 rounded-md">
        <CardContent className="w-[550px]">
          <div className="text-center space-y-3 my-7">
            <h1 className="text-3xl font-medium mt-2">Login</h1>
            <p className="text-[#929292]">
              Please enter your email and password to continue
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Label className="text-[#1A1E25] text-xl">Email</Label>
            <div>
              <Input
                id="email"
                placeholder="Enter your email"
                className="h-12 px-6 mt-2 bg-[#F6F6F6] border border-[#1A1E25] text-[#1A1E25]"
                {...register("email", { required: "Please enter your email!" })}
              />
            </div>

            <Label className="text-[#1A1E25] text-xl">Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="Enter your password"
                type={`${isPasswordVisible ? "text" : "password"}`}
                className="h-12 px-6 mt-2 bg-[#F6F6F6] border border-[#1A1E25] text-[#1A1E25]"
                {...register("password", {
                  required: "Please input your password!",
                })}
              />
              <span
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="text-slate-400 absolute right-3 top-3 cursor-pointer"
              >
                {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox />
              </div>
              <Link to="/forget-password" className="text-md text-[#1A1E25]">
                Forget password
              </Link>
            </div>

            <Button
              type="submit"
              className="bg-[#F79535] px-6 w-full mt-4 h-10 cursor-pointer hover:bg-[#F79535]"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
