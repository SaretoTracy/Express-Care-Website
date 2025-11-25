import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { toast } from "react-toastify";
import { loginUser } from "../../services/authService";

// Zod schema
const LoginSchema = z.object({
  username: z.string().min(1,"Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginType = z.infer<typeof LoginSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const handleLoginSubmit = async (data: LoginType) => {
    try {
      setLoading(true);
      const response = await loginUser(data);

      // Store user and tokens
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken || "");
      localStorage.setItem("user", JSON.stringify(response));

      toast.success("Login successful!");

      // Redirect based on role
      if (response.caregiver) navigate("/caregiver/dashboard");
      else if (response.adultHomeRepresentative) navigate("/provider/dashboard");
      else if (response.roles?.some((r: any) => r.name.toUpperCase() === "ADMIN")) navigate("/admin/dashboard");
      else navigate("/"); // fallback

    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i*0.2, duration: 0.6, ease: "easeOut" } }) };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <motion.div className="w-full max-w-md" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <motion.form
          onSubmit={handleSubmit(handleLoginSubmit)}
          className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.01]"
        >
          {/* Header */}
          <div className="bg-[#557a95] pt-6 pb-4 px-6 flex justify-center">
            <motion.img className="w-44 sm:w-52 object-contain" src={logo} alt="logo" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} />
          </div>

          {/* Body */}
          <div className="p-8">
            <h3 className="text-center font-bold text-2xl sm:text-3xl text-gray-800 mb-6">Sign In</h3>

            {/* Email */}
            <div className="mb-5">
              <label htmlFor="email" className="block font-medium mb-2" style={{ color: "#557a95" }}>Email</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Mail size={18} /></div>
                <input
                  type="username"
                  className="w-full px-10 py-3 border rounded-lg text-gray-700 focus:outline-none border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-100"
                  placeholder="your@email.com"
                  {...register("username")}
                />
              </div>
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label htmlFor="password" className="block font-medium mb-2" style={{ color: "#557a95" }}>Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Lock size={18} /></div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-10 py-3 border rounded-lg text-gray-700 focus:outline-none border-gray-300 focus:border-yellow-400 focus:ring focus:ring-yellow-100"
                  placeholder="••••••••"
                  {...register("password")}
                />
                <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg flex items-center justify-center transition-all duration-300 ${
                isHovered ? "bg-gradient-to-r from-amber-500 to-yellow-400" : "bg-gradient-to-r from-yellow-400 to-amber-500"
              } text-white font-medium shadow-md hover:shadow-lg active:shadow-sm active:translate-y-0.5`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {loading ? "Signing in..." : <><LogIn size={18} className={`mr-2 ${isHovered ? "translate-x-1" : ""}`} /> Sign in</>}
            </button>
            <p onClick={() => navigate("/forgot-password")} className="text-center text-sm mt-6 text-gray-600  hover:text-[#335a73]">
              Forgotten Password? 
            </p>

            <p className="text-center text-sm mt-6 text-gray-600">
              Don’t have an account? <button type="button" onClick={() => navigate("/signup")} className="font-medium underline text-[#557a95] hover:text-[#335a73]">Sign up here</button>
            </p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};
