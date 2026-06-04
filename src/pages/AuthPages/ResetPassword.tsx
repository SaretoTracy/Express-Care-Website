import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { AuthCard, AuthInput, AuthButton, AuthSteps } from "../../UI/AuthCard";
// import { resetPassword } from "../../services/authService";

const ResetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Minimum 8 characters")
      .regex(/[A-Z]/, "At least one uppercase letter")
      .regex(/[0-9]/, "At least one number")
      .regex(/[^A-Za-z0-9]/, "At least one special character"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetType = z.infer<typeof ResetSchema>;

// Password strength helpers
const getStrength = (pw: string) => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length >= 12) score++;
  return score; // 0–5
};

const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very strong"];
const strengthColor = ["", "#ef4444", "#f59e0b", "#84cc16", "#22c55e", "#16a34a"];

const requirements = [
  { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
  { label: "One uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
  { label: "One number", test: (pw: string) => /[0-9]/.test(pw) },
  { label: "One special character", test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
];

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email: string = (location.state as any)?.email ?? "";
  const otp: string = (location.state as any)?.otp ?? "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pwValue, setPwValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetType>({
    resolver: zodResolver(ResetSchema),
  });

  // Watch password live for strength meter
  const watched = watch("password", "");
  const strength = getStrength(watched);

  const handleReset = async (data: ResetType) => {
    try {
      setLoading(true);
      // await resetPassword({ email, otp, newPassword: data.password });
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Password reset successfully! Please sign in.");
      navigate("/login");
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to reset password.";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="New password"
      subtitle="Choose a strong password for your account"
      logo={logo}
    >
      <AuthSteps steps={["Email", "Verify", "Reset"]} current={2} />

      <form onSubmit={handleSubmit(handleReset)}>
        <AuthInput
          label="New password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          icon={<Lock size={18} />}
          register={register}
          error={errors.password?.message}
          rightIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          onRightIconClick={() => setShowPassword((p) => !p)}
        />

        {/* Strength bar */}
        {watched.length > 0 && (
          <motion.div
            className="mb-5 -mt-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <div className="flex gap-1 mb-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full transition-all duration-300"
                  style={{
                    background: i <= strength ? strengthColor[strength] : "#e5e7eb",
                  }}
                />
              ))}
            </div>
            <p className="text-xs font-medium" style={{ color: strengthColor[strength] }}>
              {strengthLabel[strength]}
            </p>

            {/* Requirements checklist */}
            <div className="mt-2 space-y-0.5">
              {requirements.map((req, i) => {
                const ok = req.test(watched);
                return (
                  <div key={i} className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${ok ? "text-green-600" : "text-gray-400"}`}>
                    <CheckCircle2 size={12} className={ok ? "text-green-500" : "text-gray-300"} />
                    {req.label}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        <AuthInput
          label="Confirm password"
          type={showConfirm ? "text" : "password"}
          name="confirmPassword"
          placeholder="••••••••"
          icon={<Lock size={18} />}
          register={register}
          error={errors.confirmPassword?.message}
          rightIcon={showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          onRightIconClick={() => setShowConfirm((p) => !p)}
        />

        <AuthButton loading={loading} loadingText="Resetting...">
          <CheckCircle2 size={17} />
          Reset password
        </AuthButton>
      </form>
    </AuthCard>
  );
};