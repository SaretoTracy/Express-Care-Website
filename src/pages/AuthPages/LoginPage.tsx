import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { toast } from "react-toastify";
import { loginUser } from "../../services/authService";
import { AuthCard, AuthInput, AuthButton } from "../../UI/AuthCard";

// Zod schema
const LoginSchema = z.object({
  username: z.string().min(1, "Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginType = z.infer<typeof LoginSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const handleLoginSubmit = async (data: LoginType) => {
    try {
      setLoading(true);
      const response = await loginUser(data);

      // Store user and tokens
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken || "");
      localStorage.setItem("user", JSON.stringify(response));

      toast.success("Login successful!");

      // Redirect based on role
      if (response.caregiver) navigate("/caregiver/dashboard");
      else if (response.adultHomeRepresentative) navigate("/provider/dashboard");
      else if (response.roles?.some((r: any) => r.name.toUpperCase() === "ADMIN"))
        navigate("/admin/dashboard");
      else navigate("/"); // fallback
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <AuthCard title="Sign In" logo={logo}>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        {/* Email */}
        <AuthInput
          label="Email"
          type="email"
          name="username"
          placeholder="your@email.com"
          icon={<Mail size={18} />}
          register={register}
          error={errors.username?.message}
        />

        {/* Password */}
        <AuthInput
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          icon={<Lock size={18} />}
          register={register}
          error={errors.password?.message}
          rightIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          onRightIconClick={togglePasswordVisibility}
        />

        {/* Submit */}
        <AuthButton loading={loading} loadingText="Signing in...">
          <LogIn size={18} className="mr-2" />
          Sign in
        </AuthButton>

        <p
          onClick={() => navigate("/forgot-password")}
          className="text-center text-sm mt-6 text-gray-600 hover:text-[#335a73] cursor-pointer"
        >
          Forgotten Password?
        </p>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="font-medium underline text-[#557a95] hover:text-[#335a73]"
          >
            Sign up here
          </button>
        </p>
      </form>
    </AuthCard>
  );
};