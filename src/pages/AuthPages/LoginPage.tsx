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

    
      console.log("[Login] full response:", JSON.stringify(response, null, 2));

      const role =
        response.roles?.[0]?.name?.toUpperCase() || "CAREGIVER";

      const normalizedUser = {
   
        ...response,
       
        accessToken: undefined,
        refreshToken: undefined,
     
        role,
        profile:
          role === "CAREGIVER"
            ? response.caregiver ?? null
            : response.adultHomeRepresentative ?? null,
      };

      setAuthData(
        normalizedUser,
        response.accessToken,
        response.refreshToken ?? ""
      );

      toast.success("Login successful!");

      if (role === "CAREGIVER") navigate("/caregiver/dashboard");
      else if (role === "HOMEREPRESENTATIVE") navigate("/provider/dashboard");
      else if (role === "ADMIN") navigate("/admin");
      else navigate("/");
    } catch (error: any) {
      console.error("[Login] error:", error);
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  };

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
          rightIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          onRightIconClick={() => setShowPassword((p) => !p)}
        />
        <AuthButton loading={loading} loadingText="Signing in...">
          <LogIn size={18} className="mr-2" />
          Sign in
        </AuthButton>
      </form>
    </AuthCard>
  );
};