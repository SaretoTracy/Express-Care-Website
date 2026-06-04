import { useState, useRef, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, ArrowLeft, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { AuthCard, AuthButton, AuthSteps } from "../../UI/AuthCard";
// import { verifyOtp, requestPasswordReset } from "../../services/authService";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60; // seconds

export const VerifyOTPPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email: string = (location.state as any)?.email ?? "";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const [resending, setResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    // Allow only digits
    const digit = value.replace(/\D/, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    // Advance focus
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const next = [...otp];
        next[index] = "";
        setOtp(next);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1)
      inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!text) return;
    const next = [...otp];
    text.split("").forEach((ch, i) => {
      if (i < OTP_LENGTH) next[i] = ch;
    });
    setOtp(next);
    inputRefs.current[Math.min(text.length, OTP_LENGTH - 1)]?.focus();
    e.preventDefault();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      toast.error("Please enter the full 6-digit code.");
      return;
    }
    try {
      setLoading(true);
      // await verifyOtp({ email, otp: code });
      await new Promise((r) => setTimeout(r, 1000)); // simulate
      toast.success("OTP verified!");
      navigate("/reset-password", { state: { email, otp: code } });
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid or expired OTP.";
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || resending) return;
    try {
      setResending(true);
      // await requestPasswordReset({ email });
      await new Promise((r) => setTimeout(r, 800));
      toast.success("New OTP sent!");
      setOtp(Array(OTP_LENGTH).fill(""));
      setCountdown(RESEND_COOLDOWN);
      inputRefs.current[0]?.focus();
    } catch {
      toast.error("Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  const allFilled = otp.every((d) => d !== "");

  return (
    <AuthCard
      title="Verify your email"
      subtitle={email ? `Enter the 6-digit code sent to ${email}` : "Enter the 6-digit code from your email"}
      logo={logo}
    >
      <AuthSteps steps={["Email", "Verify", "Reset"]} current={1} />

      {/* OTP boxes */}
      <div className="flex justify-center gap-2 sm:gap-3 mb-7" onPaste={handlePaste}>
        {otp.map((digit, i) => (
          <motion.input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`
              w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border-2
              transition-all duration-200 focus:outline-none bg-gray-50 focus:bg-white
              ${digit
                ? "border-amber-400 text-gray-800"
                : "border-gray-200 text-gray-400"
              }
              focus:border-amber-400 focus:ring-2 focus:ring-amber-100
            `}
            style={{ fontSize: "1.35rem" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </div>

      <AuthButton loading={loading} loadingText="Verifying..." onClick={handleVerify} type="button">
        <ShieldCheck size={17} />
        Verify code
      </AuthButton>

      {/* Resend */}
      <div className="mt-5 flex items-center justify-center gap-1.5 text-sm text-gray-400">
        <span>Didn't receive it?</span>
        {countdown > 0 ? (
          <span className="text-gray-500 font-medium">
            Resend in {countdown}s
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="flex items-center gap-1 font-semibold transition-colors duration-200 disabled:opacity-50"
            style={{ color: "#557a95" }}
          >
            <RefreshCw size={13} className={resending ? "animate-spin" : ""} />
            Resend OTP
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => navigate("/forgot-password")}
        className="mt-3 w-full flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors duration-200"
      >
        <ArrowLeft size={15} />
        Back
      </button>
    </AuthCard>
  );
};