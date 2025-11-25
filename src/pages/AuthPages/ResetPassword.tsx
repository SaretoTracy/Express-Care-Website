import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/authService";
import { AuthCard, AuthInput, AuthButton } from "../../UI/AuthCard";
import { Lock, Eye, EyeOff } from "lucide-react";
import logo from "../../assets/images/logo.png";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const otp = location.state?.otp;

  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Check credentials in useEffect to avoid setState during render
  useEffect(() => {
    if (!email || !otp) {
      navigate("/forgot-password");
    }
  }, [email, otp, navigate]);

  // Don't render if no credentials
  if (!email || !otp) {
    return null;
  }

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email, otp, data.password, data.confirmPassword);
      toast.success("Password updated successfully!");
      navigate("/login");
    } catch (err: any) {
      toast.error("Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Create New Password" logo={logo}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter your new password below
        </p>

        <AuthInput
          label="New Password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          icon={<Lock size={18} />}
          register={register}
          rightIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          onRightIconClick={() => setShowPassword(!showPassword)}
        />

        <AuthInput
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="••••••••"
          icon={<Lock size={18} />}
          register={register}
          rightIcon={showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <AuthButton loading={loading} loadingText="Resetting...">
          Reset Password
        </AuthButton>
      </form>
    </AuthCard>
  );
}