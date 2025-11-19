import React, { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Submitbutton } from "../../components/ButtonComponents/Submitbutton";
import { ErrorValidation } from "../../components/ErrorValidation";
import { formPhoneNumber } from "../../components/globalFunctions";
import type { IProviderSignup } from "../../Interfaces/IProviderSignUp";
import { providerRepValidator, providerHomeInfoValidator } from "../../validation/signupValidation";
import { registerProvider } from "../../services/authService";

// Step 1: Representative Form
interface IProviderRepForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  job_title: string;
}

// Step 2: Home Form
interface IProviderHomeInfoForm {
  adult_home_name: string;
  adult_home_email: string;
  adult_home_phone: string;
  adult_home_state: string;
  adult_home_city: string;
  adult_home_street: string;
  adult_home_zipcode: string;
  adult_home_website?: string;
}

export const ProviderSignup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step1Data, setStep1Data] = useState<IProviderRepForm | null>(null);

  // Step 1 Form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<IProviderRepForm>({ mode: "onChange" });

  // Step 2 Form
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2, isValid: isValid2 },
  } = useForm<IProviderHomeInfoForm>({ mode: "onChange" });

  const handlePhoneNumberFormatting = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPhoneNumber(formPhoneNumber(e.target.value));

  // Navigate from Step 1 to Step 2
  const handleRepSubmit: SubmitHandler<IProviderRepForm> = (data) => {
    try {
      const validated = providerRepValidator.parse(data);
      setStep1Data(validated);
      setStep(2);
    } catch (error: any) {
      toast.error(error?.errors?.[0]?.message || "Validation failed");
    }
  };

  // Submit Step 2 + send full payload
  const handleHomeInfoSubmit: SubmitHandler<IProviderHomeInfoForm> = async (data) => {
    if (!step1Data) return;

    try {
      const validatedHome = providerHomeInfoValidator.parse(data);

      //Step1 + Step2 to backend payload
      const payload: IProviderSignup = {
        first_name: step1Data.first_name,
        last_name: step1Data.last_name,
        email: step1Data.email,
        password: step1Data.password,
        confirmPassword: step1Data.confirm_password,
        phone_number: validatedHome.adult_home_phone, 
        job_title: step1Data.job_title,
        adult_home_name: validatedHome.adult_home_name,
        adult_home_email: validatedHome.adult_home_email,
        adult_home_phone: validatedHome.adult_home_phone,
        adult_home_state: validatedHome.adult_home_state,
        adult_home_city: validatedHome.adult_home_city,
        adult_home_street: validatedHome.adult_home_street,
        adult_home_zipcode: validatedHome.adult_home_zipcode,
        adult_home_website: validatedHome.adult_home_website,
      };

      await registerProvider(payload);
      toast.success("Provider account created successfully!");
      navigate("/login", { replace: true });
    } catch (error: any) {
      toast.error(error?.errors?.[0]?.message || error?.message || "Something went wrong");
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
              className="bg-gray-200 grid md:grid-cols-3 py-5 px-3 md:px-6 rounded-lg gap-4"
            >
              {/* Description */}
              <div className="space-y-2">
                <h5 className="text-blue-500 text-[18px] font-semibold">
                  Home Representative
                </h5>
                <p className="text-sm text-gray-600">
                  Enter your personal information
                </p>
              </div>

              {/* Form */}
              <div className="col-span-2 bg-white rounded p-4">
                <form onSubmit={handleSubmit(handleRepSubmit)} className="space-y-4">
                  {/* First + Last Name */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label>First Name <sup className="text-rose-700">*</sup></label>
                      <input
                        {...register("first_name", { required: true })}
                        className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      {errors.first_name && <ErrorValidation error="Required" />}
                    </div>

                    <div className="flex flex-col">
                      <label>Last Name <sup className="text-rose-700">*</sup></label>
                      <input
                        {...register("last_name", { required: true })}
                        className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      {errors.last_name && <ErrorValidation error="Required" />}
                    </div>
                  </div>

                  {/* Email + Password */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label>Email <sup className="text-rose-700">*</sup></label>
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      {errors.email && <ErrorValidation error="Required" />}
                    </div>

                    <div className="flex flex-col">
                      <label>Password <sup className="text-rose-700">*</sup></label>
                      <input
                        type="password"
                        {...register("password", { required: true })}
                        className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      {errors.password && <ErrorValidation error="Required" />}
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col md:w-1/2">
                    <label>Confirm Password <sup className="text-rose-700">*</sup></label>
                    <input
                      type="password"
                      {...register("confirm_password", {
                        required: true,
                        validate: (val) => val === watch("password"),
                      })}
                      className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    {errors.confirm_password && <ErrorValidation error="Passwords must match" />}
                  </div>

                  {/* Job Title */}
                  <div className="flex flex-col md:w-1/2">
                    <label>Job Title <sup className="text-rose-700">*</sup></label>
                    <input
                      {...register("job_title", { required: true })}
                      className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    {errors.job_title && <ErrorValidation error="Required" />}
                  </div>

                  <hr />

                  <div className="flex justify-between items-center pt-2">
                    <div>
                      Already have an account?{" "}
                      <Link to="/login" className="text-blue-500 underline">Login</Link>
                    </div>
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
              className="bg-gray-200 grid md:grid-cols-3 py-5 px-3 md:px-6 rounded-lg gap-4"
            >
              {/* Description */}
              <div className="space-y-2">
                <h5 className="text-blue-500 text-[18px] font-semibold">Home Information</h5>
                <p className="text-sm text-gray-600">Enter your home/facility information</p>
              </div>

              {/* Form */}
              <div className="col-span-2 bg-white rounded p-4">
                <form onSubmit={handleSubmit2(handleHomeInfoSubmit)} className="space-y-4">
                  {/* Home Name + Website */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label>Home Name <sup className="text-rose-700">*</sup></label>
                      <input
                        {...register2("adult_home_name", { required: true })}
                        className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      {errors2.adult_home_name && <ErrorValidation error="Required" />}
                    </div>

                    <div className="flex flex-col">
                      <label>Website</label>
                      <input
                        placeholder="https://example.com"
                        {...register2("adult_home_website")}
                        className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label>Work Email <sup className="text-rose-700">*</sup></label>
                      <input
                        type="email"
                        {...register2("adult_home_email", { required: true })}
                        className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      {errors2.adult_home_email && <ErrorValidation error="Required" />}
                    </div>

                    <div className="flex flex-col">
                      <label>Phone Number <sup className="text-rose-700">*</sup></label>
                      <input
                        type="tel"
                        {...register2("adult_home_phone", { required: true })}
                        onChange={handlePhoneNumberFormatting}
                        value={phoneNumber}
                        className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      {errors2.adult_home_phone && <ErrorValidation error="Required" />}
                    </div>
                  </div>

                  {/* State + City */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label>State <sup className="text-rose-700">*</sup></label>
                      <input
                        {...register2("adult_home_state", { required: true })}
                        className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      {errors2.adult_home_state && <ErrorValidation error="Required" />}
                    </div>

                    <div className="flex flex-col">
                      <label>City <sup className="text-rose-700">*</sup></label>
                      <input
                        {...register2("adult_home_city", { required: true })}
                        className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      {errors2.adult_home_city && <ErrorValidation error="Required" />}
                    </div>
                  </div>

                  {/* Street + Zipcode */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label>Street <sup className="text-rose-700">*</sup></label>
                      <input
                        {...register2("adult_home_street", { required: true })}
                        className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      {errors2.adult_home_street && <ErrorValidation error="Required" />}
                    </div>

                    <div className="flex flex-col">
                      <label>Zipcode <sup className="text-rose-700">*</sup></label>
                      <input
                        {...register2("adult_home_zipcode", { required: true })}
                        className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                      {errors2.adult_home_zipcode && <ErrorValidation error="Required" />}
                    </div>
                  </div>

                  <hr />

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      className="text-blue-500 underline"
                      onClick={() => setStep(1)}
                    >
                      ← Back
                    </button>
                    <Submitbutton value="Create Account" type="submit" disabled={!isValid2} />
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
