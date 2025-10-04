import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Submitbutton } from "../../components/ButtonComponents/Submitbutton";
import { ErrorValidation } from "../../components/ErrorValidation";
import { Link, useNavigate } from "react-router-dom";
import { formPhoneNumber } from "../../components/globalFunctions";
import type { ISignup } from "../../Interfaces/ISignUp";
import type { IHomeInfo } from "../../Interfaces/IProviderSignUp";

export const ProviderSignup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Step 1 Form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ISignup>({ mode: "onChange" });

  // Step 2 Form
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2, isValid: isValid2 },
  } = useForm<IHomeInfo>({ mode: "onChange" });

  const handlePhoneNumberFormatting = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPhoneNumber(formPhoneNumber(e.target.value));

  // Step 1 → Step 2
  const handleSignupSubmit: SubmitHandler<ISignup> = () => {
    if (isValid) setStep(2);
  };

  // Step 2 → ComingSoon
  const handleHomeInfoSubmit: SubmitHandler<IHomeInfo> = () => {
    if (isValid2) navigate("/comingsoon");
  };

  // Animation variants
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

  useEffect(() => window.scrollTo(0, 0), [step]);

  return (
    <div className="my-10 space-y-4 overflow-hidden">
      {/* HEADER */}
      <h3 className="text-center text-yellow-400 text-[25px] font-bold">
        Create a Provider's Account
      </h3>
      <p className="text-center text-blue-500">
        Reach top talent and find the right candidate.
      </p>

      {/*  Animated Progress Bar */}
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

      {/* FORMS */}
      <div className="relative mx-auto w-[90%] md:w-[80%] rounded-lg overflow-hidden min-h-[500px]">
        <AnimatePresence custom={direction} mode="wait">
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-gray-200 grid md:grid-cols-3 py-5 px-3 md:px-6 rounded-lg"
            >
              <div>
                <h5 className="text-blue-500 text-[18px]">Home Representative</h5>
                <p>This information pertains to you as a representative of a home.</p>
              </div>

              <div className="col-span-2 bg-white rounded">
                <form
                  className="px-2 space-y-3 py-3"
                  onSubmit={handleSubmit(handleSignupSubmit)}
                >
                  <div className="space-y-3 md:grid grid-cols-2 md:space-x-3">
                    <div className="flex flex-col">
                      <label htmlFor="firstName" className="text-gray-700">
                        First Name <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="text"
                        {...register("firstName", { required: true })}
                        className={`border border-gray-400 rounded focus:outline-[1px] ${
                          errors.firstName
                            ? "focus:outline-red-500"
                            : "focus:outline-yellow-400"
                        }`}
                      />
                      {errors.firstName && (
                        <ErrorValidation error="Field cannot be empty" />
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="lastName" className="text-gray-700">
                        Last Name <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="text"
                        {...register("lastName", { required: true })}
                        className={`border border-gray-400 rounded focus:outline-[1px] ${
                          errors.lastName
                            ? "focus:outline-red-500"
                            : "focus:outline-yellow-400"
                        }`}
                      />
                      {errors.lastName && (
                        <ErrorValidation error="Field cannot be empty" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 md:grid grid-cols-2 md:space-x-3">
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-gray-700">
                        Email <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: true,
                          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        })}
                        className="border border-gray-400 rounded focus:outline-yellow-400"
                      />
                      {errors.email && (
                        <ErrorValidation error="Enter a valid email" />
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="password" className="text-gray-700">
                        Password <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="password"
                        {...register("password", {
                          required: true,
                          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                        })}
                        className="border border-gray-400 rounded focus:outline-yellow-400"
                      />
                      {errors.password && (
                        <ErrorValidation error="Use uppercase, lowercase, and a number (6–15 chars)" />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="confirmPassword" className="text-gray-700">
                      Confirm Password <sup className="text-rose-700">*</sup>
                    </label>
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: true,
                        validate: (val: string) => watch("password") === val,
                      })}
                      className="border border-gray-400 rounded focus:outline-yellow-400"
                    />
                    {errors.confirmPassword && (
                      <ErrorValidation error="Passwords must match" />
                    )}
                  </div>

                  <div>
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 underline">
                      Login
                    </Link>
                  </div>

                  <hr />
                  <div className="flex justify-end">
                    <Submitbutton value="Next" type="submit" disabled={!isValid} />
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-gray-200 grid md:grid-cols-3 py-5 px-3 md:px-6 rounded-lg"
            >
              <div>
                <h5 className="text-blue-500 text-[18px]">Home Information</h5>
                <p>This information pertains to the home facility.</p>
              </div>

              <div className="col-span-2 bg-white rounded">
                <form
                  className="px-2 space-y-3 py-3"
                  onSubmit={handleSubmit2(handleHomeInfoSubmit)}
                >
                  <div className="grid md:grid-cols-2 md:space-x-3">
                    <div className="flex flex-col">
                      <label htmlFor="homeName" className="text-gray-700">
                        Home Name <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="text"
                        {...register2("homeName", { required: true })}
                        className="border border-gray-400 rounded focus:outline-yellow-400"
                      />
                      {errors2.homeName && <ErrorValidation error="Field required" />}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="website" className="text-gray-700">
                        Website
                      </label>
                      <input
                        type="text"
                        {...register2("website")}
                        className="border border-gray-400 rounded focus:outline-yellow-400"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 md:space-x-3">
                    <div className="flex flex-col">
                      <label htmlFor="workEmail" className="text-gray-700">
                        Work Email <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="email"
                        {...register2("workEmail", { required: true })}
                        className="border border-gray-400 rounded focus:outline-yellow-400"
                      />
                      {errors2.workEmail && <ErrorValidation error="Field required" />}
                    </div>

                    <div className="flex flex-col">
  <label htmlFor="phoneNumber" className="text-gray-700">
    Phone Number <sup className="text-rose-700">*</sup>
  </label>
  <input
    type="tel"
    {...register2("phoneNumber", {
      required: true,
      minLength: 10,
      onChange: (e) => setPhoneNumber(formPhoneNumber(e.target.value)),
    })}
    value={phoneNumber}
    className="border border-gray-400 rounded focus:outline-yellow-400"
  />
  {errors2.phoneNumber && (
    <ErrorValidation error="Enter a valid phone number" />
  )}
</div>
                  </div>

                  <div className="grid md:grid-cols-2 md:space-x-3">
                    <div className="flex flex-col">
                      <label htmlFor="state" className="text-gray-700">
                        State <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="text"
                        {...register2("state", { required: true })}
                        className="border border-gray-400 rounded focus:outline-yellow-400"
                      />
                      {errors2.state && <ErrorValidation error="Field required" />}
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="city" className="text-gray-700">
                        City <sup className="text-rose-700">*</sup>
                      </label>
                      <input
                        type="text"
                        {...register2("city", { required: true })}
                        className="border border-gray-400 rounded focus:outline-yellow-400"
                      />
                      {errors2.city && <ErrorValidation error="Field required" />}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="text-blue-500 underline"
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
