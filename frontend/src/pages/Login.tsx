import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const authSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthForm = z.infer<typeof authSchema>;

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthForm) => {
    setLoading(true);
    try {
      const endpoint = import.meta.env.VITE_API_URL + "/api/auth/login";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const user = await response.json();

      if (user?.data?.user) {
        localStorage.setItem("user", JSON.stringify(user?.data?.user));
        // redirect to home page "/"
        navigate("/");
      } else {
        throw new Error("Something went wrong");
      }

      toast.success("Login successful!");
      // Handle successful login or signup
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left: Auth Form */}
      <div className="w-1/2 flex flex-col gap-4 items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-500"
                  size={20}
                />
                <Input
                  type="username"
                  placeholder="Username"
                  className="pl-10"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-gray-500"
                  size={20}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="pl-10 pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Processing..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {import.meta.env.VITE_DEMO_SERVER === "true" && (
          <Card className="w-full bg-gray-50 max-w-md shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-base font-normal">
                Demo Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                <li className="p-2 text-sm flex justify-between">
                  <b className="w-1/3">Manager</b>{" "}
                  <span className="w-2/3 text-left">
                    username: manager | pass: m123456
                  </span>
                </li>
                <li className="p-2 text-sm flex justify-between">
                  <b className="w-1/3">Kitchen</b>{" "}
                  <span className="w-2/3 text-left">
                    username: chef | pass: c123456
                  </span>
                </li>
                <li className="p-2 text-sm flex justify-between">
                  <b className="w-1/3">Waiter1</b>{" "}
                  <span className="w-2/3 text-left">
                    username: waiter2 | pass: w123456
                  </span>
                </li>
                <li className="p-2 text-sm flex justify-between">
                  <b className="w-1/3">Waiter2</b>{" "}
                  <span className="w-2/3 text-left">
                    username: waiter2 | pass: w123456
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right: Wallpaper */}
      <div
        className="w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/login-bg.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
    </div>
  );
}
