import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Submitbutton } from "../../components/ButtonComponents/Submitbutton";
import { ErrorValidation } from "../../components/ErrorValidation";
import { Link, useNavigate } from "react-router-dom";
import { formPhoneNumber } from "../../components/globalFunctions";
import { toast } from "react-toastify";
import type { ISignup } from "../../Interfaces/ISignUp";
import type { IHomeInfo } from "../../Interfaces/IProviderSignUp";

export const ProviderSignup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Step 1 Form - Personal Information
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ISignup>({ mode: "onChange" });

  // Step 2 Form - Home Information
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2, isValid: isValid2 },
  } = useForm<IHomeInfo>({ mode: "onChange" });

  const handlePhoneNumberFormatting = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPhoneNumber(formPhoneNumber(e.target.value));

  // Navigate from Step 1 to Step 2
  const handleSignupSubmit: SubmitHandler<ISignup> = (data) => {
    if (isValid) {
      console.log("Step 1 data:", data);
      setStep(2);
    }
  };


  const handleHomeInfoSubmit: SubmitHandler<IHomeInfo> = (data) => {
    if (isValid2) {
      console.log("Step 2 data:", data);
      toast.info("Feature coming soon!");
      navigate("/comingsoon", { replace: true });
    }
  };


  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const direction = step === 2 ? 1 : -1;

  // Scroll to top 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  return (
    <div className="my-10 space-y-4 overflow-hidden">
      {/* HEADER */}
      <div className="text-center space-y-2">
        <h3 className="text-yellow-400 text-[25px] font-bold">
          Create a Provider's Account
        </h3>
        <p className="text-blue-500">
          Reach top talent and find the right candidate.
        </p>
      </div>

      {/* PROGRESS BAR */}
      <div className="mx-auto w-[90%] md:w-[70%] mt-6">
        <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-blue-500"
            initial={{ width: "50%" }}
            animate={{ width: step === 1 ? "50%" : "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>
        <p className="text-center text-sm mt-2 text-gray-600">
          Step {step} of 2
        </p>
      </div>

      {/* FORMS CONTAINER */}
      <div className="relative mx-auto w-[90%] md:w-[80%] rounded-lg overflow-hidden min-h-[500px]">
        <AnimatePresence custom={direction} mode="wait">
          {/* STEP 1 - PERSONAL INFORMATION */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-gray-200 grid md:grid-cols-3 py-5 px-3 md:px-6 rounded-lg gap-4"
            >
              {/* Step Description */}
              <div className="space-y-2">
                <h5 className="text-blue-500 text-[18px] font-semibold">
                  Home Representative
                </h5>
                <p className="text-sm text-gray-600">
                  This information pertains to you as a representative of a home.
                </p>
              </div>

              {/* Form */}
              <div className="col-span-2 bg-white rounded p-4">
                <form
                  className="space-y-4"
                  onSubmit={handleSubmit(handleSignupSubmit)}
                >
                  {/* Name Fields */}
                  <div className="space-y-3 md:space-y-0 md:grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label htmlFor="firstName" className="text-gray-700 mb-1">
                        First Name <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="text"
                        {...register("firstName", { required: true })}
                        className={`border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 transition ${
                          errors.firstName
                            ? "focus:ring-red-500 border-red-500"
                            : "focus:ring-yellow-400"
                        }`}
                      />
                      {errors.firstName && (
                        <ErrorValidation error="Field cannot be empty" />
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="lastName" className="text-gray-700 mb-1">
                        Last Name <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="text"
                        {...register("lastName", { required: true })}
                        className={`border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 transition ${
                          errors.lastName
                            ? "focus:ring-red-500 border-red-500"
                            : "focus:ring-yellow-400"
                        }`}
                      />
                      {errors.lastName && (
                        <ErrorValidation error="Field cannot be empty" />
                      )}
                    </div>
                  </div>

                  {/* Email and Password */}
                  <div className="space-y-3 md:space-y-0 md:grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-gray-700 mb-1">
                        Email <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                          },
                        })}
                        className={`border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 transition ${
                          errors.email
                            ? "focus:ring-red-500 border-red-500"
                            : "focus:ring-yellow-400"
                        }`}
                      />
                      {errors.email && (
                        <ErrorValidation error="Enter a valid email" />
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="password" className="text-gray-700 mb-1">
                        Password <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="password"
                        {...register("password", {
                          required: true,
                          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                        })}
                        className={`border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 transition ${
                          errors.password
                            ? "focus:ring-red-500 border-red-500"
                            : "focus:ring-yellow-400"
                        }`}
                      />
                      {errors.password && (
                        <ErrorValidation error="Use uppercase, lowercase, and a number (6–15 chars)" />
                      )}
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col md:w-1/2 md:pr-1.5">
                    <label htmlFor="confirmPassword" className="text-gray-700 mb-1">
                      Confirm Password <sup className="text-rose-700">*</sup>
                    </label>
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: true,
                        validate: (val: string) => watch("password") === val,
                      })}
                      className={`border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 transition ${
                        errors.confirmPassword
                          ? "focus:ring-red-500 border-red-500"
                          : "focus:ring-yellow-400"
                      }`}
                    />
                    {errors.confirmPassword && (
                      <ErrorValidation error="Passwords must match" />
                    )}
                  </div>

                  <hr className="my-4" />

                  {/* Login Link */}
                  <div className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 underline hover:text-blue-600">
                      Login
                    </Link>
                  </div>

                  {/* Next Button */}
                  <div className="flex justify-end pt-2">
                    <Submitbutton 
                      value="Next" 
                      type="submit" 
                      disabled={!isValid} 
                    />
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* STEP 2 - HOME INFORMATION */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-gray-200 grid md:grid-cols-3 py-5 px-3 md:px-6 rounded-lg gap-4"
            >
              {/* Step Description */}
              <div className="space-y-2">
                <h5 className="text-blue-500 text-[18px] font-semibold">
                  Home Information
                </h5>
                <p className="text-sm text-gray-600">
                  This information pertains to the home facility.
                </p>
              </div>

              {/* Form */}
              <div className="col-span-2 bg-white rounded p-4">
                <form
                  className="space-y-4"
                  onSubmit={handleSubmit2(handleHomeInfoSubmit)}
                >
                  {/* Home Name and Website */}
                  <div className="space-y-3 md:space-y-0 md:grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label htmlFor="homeName" className="text-gray-700 mb-1">
                        Home Name <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="text"
                        {...register2("homeName", { required: true })}
                        className={`border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 transition ${
                          errors2.homeName
                            ? "focus:ring-red-500 border-red-500"
                            : "focus:ring-yellow-400"
                        }`}
                      />
                      {errors2.homeName && <ErrorValidation error="Field required" />}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="website" className="text-gray-700 mb-1">
                        Website
                      </label>
                      <input
                        type="text"
                        placeholder="https://example.com"
                        {...register2("website")}
                        className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                      />
                    </div>
                  </div>

                  {/* Work Email and Phone */}
                  <div className="space-y-3 md:space-y-0 md:grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label htmlFor="workEmail" className="text-gray-700 mb-1">
                        Work Email <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="email"
                        {...register2("workEmail", {
                          required: true,
                          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        })}
                        className={`border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 transition ${
                          errors2.workEmail
                            ? "focus:ring-red-500 border-red-500"
                            : "focus:ring-yellow-400"
                        }`}
                      />
                      {errors2.workEmail && <ErrorValidation error="Valid email required" />}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="phoneNumber" className="text-gray-700 mb-1">
                        Phone Number <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="tel"
                        {...register2("phoneNumber", {
                          required: true,
                          minLength: 10,
                        })}
                        onChange={handlePhoneNumberFormatting}
                        value={phoneNumber}
                        placeholder="(123) 456-7890"
                        className={`border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 transition ${
                          errors2.phoneNumber
                            ? "focus:ring-red-500 border-red-500"
                            : "focus:ring-yellow-400"
                        }`}
                      />
                      {errors2.phoneNumber && (
                        <ErrorValidation error="Enter a valid phone number" />
                      )}
                    </div>
                  </div>

                  {/* State and City */}
                  <div className="space-y-3 md:space-y-0 md:grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label htmlFor="state" className="text-gray-700 mb-1">
                        State <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="text"
                        {...register2("state", { required: true })}
                        className={`border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 transition ${
                          errors2.state
                            ? "focus:ring-red-500 border-red-500"
                            : "focus:ring-yellow-400"
                        }`}
                      />
                      {errors2.state && <ErrorValidation error="Field required" />}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="city" className="text-gray-700 mb-1">
                        City <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="text"
                        {...register2("city", { required: true })}
                        className={`border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 transition ${
                          errors2.city
                            ? "focus:ring-red-500 border-red-500"
                            : "focus:ring-yellow-400"
                        }`}
                      />
                      {errors2.city && <ErrorValidation error="Field required" />}
                    </div>
                  </div>

                  <hr className="my-4" />

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-600 underline font-medium transition"
                      onClick={() => setStep(1)}
                    >
                      ← Back
                    </button>
                    <Submitbutton
                      value="Create Your Account"
                      type="submit"
                      disabled={!isValid2}
                    />
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};