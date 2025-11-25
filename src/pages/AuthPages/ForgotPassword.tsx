import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { requestResetOtp } from "../../services/authService";

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      await requestResetOtp(data.email);
      toast.success("OTP sent to your email!");

      navigate("/verify-otp", {
        state: { email: data.email }, // pass email to next page
      });
    } catch (err: any) {
      toast.error(err.response?.data || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        className="w-full max-w-md bg-white shadow-xl p-8 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.h2 variants={fadeInUp} custom={0} className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </motion.h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div variants={fadeInUp} custom={1} className="mb-6">
            <label className="block mb-2 text-[#557a95]">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                {...register("email")}
                className="w-full px-10 py-3 border rounded-lg"
                placeholder="your@email..."
              />
            </div>
          </motion.div>

          <motion.button
            className="w-full py-3 bg-yellow-500 text-white rounded-lg"
            type="submit"
            disabled={loading}
            variants={fadeInUp}
            custom={2}
          >
            {loading ? "Sending..." : "Send OTP"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
