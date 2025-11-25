import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/authService";


export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const otp = location.state?.otp;

  const { register, handleSubmit } = useForm();

  if (!email || !otp) {
    navigate("/forgot-password");
    return null;
  }

  const onSubmit = async (data: any) => {
    try {
      await resetPassword(email, otp, data.password, data.confirmPassword);
      toast.success("Password updated!");
      navigate("/login");
    } catch (err: any) {
      toast.error("Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create New Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2 text-[#557a95]">New Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-[#557a95]">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          <button className="w-full bg-yellow-500 py-3 text-white rounded-lg">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
