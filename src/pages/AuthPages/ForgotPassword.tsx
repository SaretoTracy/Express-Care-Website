import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { requestResetOtp } from "../../services/authService";
import { AuthCard, AuthInput, AuthButton } from "../../UI/AuthCard";
import logo from "../../assets/images/logo.png";

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await requestResetOtp(data.email);
      toast.success("OTP sent to your email!");
      
      // Redirect to verify OTP page with email
      navigate("/verify-otp", {
        state: { email: data.email },
      });
    } catch (err: any) {
      toast.error(err.response?.data || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Forgot Password" logo={logo}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter your email address and we'll send you a code to reset your password
        </p>

        <AuthInput
          label="Email"
          type="email"
          name="email"
          placeholder="your@email.com"
          icon={<Mail size={18} />}
          register={register}
        />

        <AuthButton loading={loading} loadingText="Sending...">
          Send OTP
        </AuthButton>

        <p className="text-center text-sm mt-6 text-gray-600">
          Remember your password?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium underline text-[#557a95] hover:text-[#335a73]"
          >
            Sign in here
          </button>
        </p>
      </form>
    </AuthCard>
  );
}