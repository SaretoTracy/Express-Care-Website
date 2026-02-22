import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { verifyResetOtp } from "../../services/authService";
import { AuthCard, AuthInput, AuthButton } from "../../UI/AuthCard";
import { KeyRound } from "lucide-react";
import logo from "../../assets/images/logo.png";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  // Check email in useEffect to avoid setState during render
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  // Don't render if no email
  if (!email) {
    return null;
  }

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await verifyResetOtp(email, data.otp);
      toast.success("OTP Verified!");
      navigate("/reset-password", {
        state: { email, otp: data.otp },
      });
    } catch (err: any) {
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Verify OTP" logo={logo}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter the 6-digit code sent to <strong>{email}</strong>
        </p>

        <AuthInput
          label="Enter OTP"
          type="text"
          name="otp"
          placeholder="123456"
          icon={<KeyRound size={18} />}
          register={register}
        />

        <AuthButton loading={loading} loadingText="Verifying...">
          Verify OTP
        </AuthButton>

        <p className="text-center text-sm mt-6 text-gray-600">
          Didn't receive code?{" "}
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="font-medium underline text-[#557a95] hover:text-[#335a73]"
          >
            Resend
          </button>
        </p>
      </form>
    </AuthCard>
  );
}