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
import { useAuth } from "../../context/AuthContext";

const LoginSchema = z.object({
  username: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginType = z.infer<typeof LoginSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

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

      const role =
        response.roles?.[0]?.name?.toUpperCase() || "CAREGIVER";

      let profile = null;

      if (role === "CAREGIVER" && response.caregiver) {
        profile = response.caregiver;
      }

      if (
        role === "HOMEREPRESENTATIVE" &&
        response.adultHomeRepresentative
      ) {
        profile = response.adultHomeRepresentative;
      }

      const normalizedUser = {
        id: response.id,
        username: response.username,
        role,
        profile,
      };

      // 🔥 Use context instead of localStorage directly
      setAuthData(
        normalizedUser,
        response.accessToken,
        response.refreshToken || ""
      );

      toast.success("Login successful!");

      if (role === "CAREGIVER") navigate("/caregiver/dashboard");
      else if (role === "HOMEREPRESENTATIVE")
        navigate("/provider/dashboard");
      else if (role === "ADMIN") navigate("/admin");
      else navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () =>
    setShowPassword(!showPassword);

  return (
    <AuthCard title="Sign In" logo={logo}>
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <AuthInput
          label="Email"
          type="email"
          name="username"
          placeholder="your@email.com"
          icon={<Mail size={18} />}
          register={register}
          error={errors.username?.message}
        />

        <AuthInput
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          icon={<Lock size={18} />}
          register={register}
          error={errors.password?.message}
          rightIcon={
            showPassword ? <EyeOff size={18} /> : <Eye size={18} />
          }
          onRightIconClick={togglePasswordVisibility}
        />

        <AuthButton loading={loading} loadingText="Signing in...">
          <LogIn size={18} className="mr-2" />
          Sign in
        </AuthButton>
      </form>
    </AuthCard>
  );
};