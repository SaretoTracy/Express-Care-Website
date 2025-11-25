import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { verifyResetOtp } from "../../services/authService";


export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email; // ensure email passed from previous step
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  if (!email) {
    navigate("/forgot-password");
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
    <div className="min-h-screen flex justify-center items-center p-4 bg-gray-50">
      <motion.div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Verify OTP
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block mb-2 text-[#557a95]">Enter OTP</label>
            <input
              type="text"
              {...register("otp")}
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="123456"
            />
          </div>

          <button className="w-full bg-yellow-500 text-white py-3 rounded-lg" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
