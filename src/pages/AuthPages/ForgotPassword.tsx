import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { AuthCard, AuthInput, AuthButton, AuthSteps } from "../../UI/AuthCard";
// import { requestPasswordReset } from "../../services/authService"; // wire up your API

const ForgotSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type ForgotType = z.infer<typeof ForgotSchema>;

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotType>({
    resolver: zodResolver(ForgotSchema),
  });

  const handleSubmitEmail = async (data: ForgotType) => {
    try {
      setLoading(true);
      // await requestPasswordReset({ email: data.email });
      // ↑ Uncomment and wire to your API. For now we simulate a delay:
      await new Promise((r) => setTimeout(r, 1000));

      toast.success("OTP sent! Check your inbox.");
      // Pass the email forward so OTP & reset pages can use it
      navigate("/verify-otp", { state: { email: data.email } });
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to send OTP. Please try again.";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Reset password"
      subtitle="We'll send a one-time code to your email"
      logo={logo}
    >
      <AuthSteps steps={["Email", "Verify", "Reset"]} current={0} />

      <form onSubmit={handleSubmit(handleSubmitEmail)}>
        <AuthInput
          label="Email address"
          type="email"
          name="email"
          placeholder="your@email.com"
          icon={<Mail size={18} />}
          register={register}
          error={errors.email?.message}
        />

        <AuthButton loading={loading} loadingText="Sending OTP...">
          <ArrowRight size={17} />
          Send OTP
        </AuthButton>
      </form>

      <button
        type="button"
        onClick={() => navigate("/login")}
        className="mt-4 w-full flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors duration-200"
      >
        <ArrowLeft size={15} />
        Back to sign in
      </button>
    </AuthCard>
  );
};