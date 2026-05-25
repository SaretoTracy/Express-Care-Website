import React, { useContext, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Submitbutton } from "../../components/ButtonComponents/Submitbutton";
import { ErrorValidation } from "../../components/ErrorValidation";
import { formPhoneNumber } from "../../components/globalFunctions";
import { toast } from "react-toastify";
import { SwitchToggleContext } from "../../context/GeneralContext";
import { caregiverSignupValidator } from "../../validation/signupValidation";
import type { z } from "zod";
import axios from "axios";

type CaregiverSignupForm = z.infer<typeof caregiverSignupValidator>;
import { registerCaregiver } from "../../services/authService";

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 bg-gray-50 focus:outline-none focus:border-[#e68a1f] focus:ring-2 focus:ring-[#e68a1f]/20";
const inputErrCls =
  "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-100";

const SectionHeader: React.FC<{
  title: string;
  subtitle: string;
}> = ({ title, subtitle }) => (
  <div className="bg-gradient-to-r from-[#3a5a72] to-[#557A95] px-5 py-4 flex items-center gap-3">
    <div>
      <h2 className="text-white text-base font-semibold">{title}</h2>
      <p className="text-white/70 text-sm">{subtitle}</p>
    </div>
  </div>
);

const Field: React.FC<{
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}> = ({ label, required, error, children }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold text-[#557A95] mb-1.5">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
    {error && <ErrorValidation error={error} />}
  </div>
);

export const CaregiverSignup: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(SwitchToggleContext);
  const switchSpinnerOn = context?.switchSpinnerOn ?? (() => {});
  const switchSpinnerOff = context?.switchSpinnerOff ?? (() => {});

  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CaregiverSignupForm>({
    resolver: zodResolver(caregiverSignupValidator),
  });

  const fieldCls = (hasError: boolean) =>
    `${inputCls} ${hasError ? inputErrCls : ""}`;

  const handlePhoneNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("phoneNumber", formPhoneNumber(e.target.value), {
      shouldValidate: true,
    });
  };

  const handleSignupSubmit: SubmitHandler<CaregiverSignupForm> = async (
    data
  ) => {
    switchSpinnerOn();
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        dateOfBirth: data.dateOfBirth.toString(),
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        city: data.city,
        state: data.state,
        street: data.street,
        zipcode: data.zipcode,
      };
      await registerCaregiver(payload);
      toast.success("Account created successfully!");
      navigate("/login", { replace: true });
    } catch (error: unknown) {
      // Handle raw Axios errors (authService now re-throws originals)
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message;
        if (Array.isArray(msg)) {
          toast.error(msg[0]);
        } else if (typeof msg === "string" && msg.length > 0) {
          toast.error(msg);
        } else {
          const fallback =
            error.response?.data?.error ||
            error.response?.data?.errorMsg ||
            error.message ||
            "An unexpected error occurred";
          toast.error(fallback);
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      switchSpinnerOff();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-8">
          <span className="inline-block bg-[#fde8cc] text-[#7a3d00] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
            Join Our Team
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2c4a60]">
            Create Your{" "}
            <span className="text-[#e68a1f]">Caregiver</span> Account
          </h1>
          <p className="text-gray-500 mt-2">
            Your dream job is one step away — let&apos;s get you started
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit(handleSignupSubmit)}>
            <SectionHeader
              title="Personal Information"
              subtitle="Tell us a bit about yourself"
            />
            <div className="p-5 sm:p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="First Name"
                  required
                  error={errors.firstName?.message}
                >
                  <input
                    type="text"
                    className={fieldCls(!!errors.firstName)}
                    placeholder="Jane"
                    {...register("firstName")}
                  />
                </Field>
                <Field
                  label="Last Name"
                  required
                  error={errors.lastName?.message}
                >
                  <input
                    type="text"
                    className={fieldCls(!!errors.lastName)}
                    placeholder="Doe"
                    {...register("lastName")}
                  />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Date of Birth"
                  required
                  error={errors.dateOfBirth?.message}
                >
                  <input
                    type="date"
                    className={fieldCls(!!errors.dateOfBirth)}
                    {...register("dateOfBirth")}
                  />
                </Field>
                <Field
                  label="Gender"
                  required
                  error={errors.gender?.message}
                >
                  <select
                    className={fieldCls(!!errors.gender)}
                    defaultValue=""
                    {...register("gender")}
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>
              </div>
            </div>

            <SectionHeader
              title="Account Credentials"
              subtitle="Secure your account with a strong password"
            />
            <div className="p-5 sm:p-6 space-y-4">
              <Field
                label="Email Address"
                required
                error={errors.email?.message}
              >
                <input
                  type="email"
                  className={fieldCls(!!errors.email)}
                  placeholder="jane.doe@email.com"
                  {...register("email")}
                />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Password"
                  required
                  error={errors.password?.message}
                >
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      className={`${fieldCls(!!errors.password)} pr-10`}
                      placeholder="Min. 8 characters"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPw((p) => !p)}
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </Field>
                <Field
                  label="Confirm Password"
                  required
                  error={errors.confirmPassword?.message}
                >
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      className={`${fieldCls(!!errors.confirmPassword)} pr-10`}
                      placeholder="Re-enter password"
                      {...register("confirmPassword")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirm((p) => !p)}
                      aria-label={
                        showConfirm ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirm ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </Field>
              </div>
            </div>

            <SectionHeader
              title="Address Details"
              subtitle="Where are you based?"
            />
            <div className="p-5 sm:p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="State"
                  required
                  error={errors.state?.message}
                >
                  <input
                    type="text"
                    className={fieldCls(!!errors.state)}
                    placeholder="e.g. California"
                    {...register("state")}
                  />
                </Field>
                <Field label="City" required error={errors.city?.message}>
                  <input
                    type="text"
                    className={fieldCls(!!errors.city)}
                    placeholder="e.g. Los Angeles"
                    {...register("city")}
                  />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Zip Code"
                  required
                  error={errors.zipcode?.message}
                >
                  <input
                    type="text"
                    className={fieldCls(!!errors.zipcode)}
                    placeholder="e.g. 90001"
                    {...register("zipcode")}
                  />
                </Field>
                <Field
                  label="Street Address"
                  required
                  error={errors.street?.message}
                >
                  <input
                    type="text"
                    className={fieldCls(!!errors.street)}
                    placeholder="e.g. 123 Main St"
                    {...register("street")}
                  />
                </Field>
              </div>
              <Field
                label="Phone Number"
                required
                error={errors.phoneNumber?.message}
              >
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-600 text-sm font-semibold">
                    +1
                  </span>
                  <input
                    type="tel"
                    className={`${fieldCls(!!errors.phoneNumber)} rounded-l-none`}
                    placeholder="(555) 000-0000"
                    {...register("phoneNumber", {
                      onChange: handlePhoneNumberChange,
                    })}
                  />
                </div>
              </Field>
            </div>

            <div className="px-5 sm:px-6 py-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[#e68a1f] rounded"
                    {...register("terms")}
                  />
                  <span className="text-sm text-gray-600">
                    I agree to all the{" "}
                    <Link
                      to="/comingsoon"
                      className="text-[#557A95] underline"
                    >
                      Terms and Conditions
                    </Link>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.terms.message}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-3">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-[#557A95] font-semibold hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
              <div className="sm:flex-shrink-0">
                <Submitbutton value="Create Account" type="submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};