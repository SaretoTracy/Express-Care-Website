import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { type ILogin, loginValidator } from "../../validation/signupValidation";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginValidator),
  });

  const handleLoginSubmit = async (data: ILogin) => {
    try {
      setLoading(true);

      const res = await loginUser(data);

      login(res.user, res.token);

      if (res.user.role === "caregiver") navigate("/caregiver/dashboard");
      else if (res.user.role === "provider") navigate("/provider/dashboard");
      else if (res.user.role === "admin") navigate("/admin/dashboard");
      else navigate("/");

    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.form
          onSubmit={handleSubmit(handleLoginSubmit)}
          className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.01]"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {/* Header */}
          <motion.div className="bg-[#557a95] pt-6 pb-4 px-6" variants={fadeInUp} custom={0}>
            <div className="flex justify-center">
              <motion.img
                className="w-44 sm:w-52 object-contain"
                src={logo}
                alt="logo"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Body */}
          <div className="p-8">
            <motion.h3 className="text-center font-bold text-2xl sm:text-3xl text-gray-800 mb-6" variants={fadeInUp} custom={1}>
              Sign In
            </motion.h3>

            {/* Email */}
            <motion.div className="mb-5" variants={fadeInUp} custom={2}>
              <label className="block font-medium mb-2 text-[#557a95]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  className="w-full px-10 py-3 border rounded-lg text-gray-700 focus:outline-none border-gray-300"
                  placeholder="your@email.com"
                  {...register("username")}
                />
              </div>
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </motion.div>

            {/* Password */}
            <motion.div className="mb-6" variants={fadeInUp} custom={3}>
              <label className="block font-medium mb-2 text-[#557a95]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-10 py-3 border rounded-lg text-gray-700 focus:outline-none border-gray-300"
                  placeholder="••••••••"
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </motion.div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              variants={fadeInUp}
              custom={4}
              className={`w-full py-3 rounded-lg flex items-center justify-center text-white font-medium shadow-md`}
            >
              <LogIn size={18} className="mr-2" />
              {loading ? "Signing in..." : "Sign in"}
            </motion.button>

            {/* Signup Link */}
            <motion.p className="text-center text-sm mt-6 text-gray-600" variants={fadeInUp} custom={5}>
              Don’t have an account?{" "}
              <button onClick={() => navigate("/signup")} className="font-medium underline text-[#557a95]">
                Sign up here
              </button>
            </motion.p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};
