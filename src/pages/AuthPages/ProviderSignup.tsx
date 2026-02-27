import React, { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Submitbutton } from "../../components/ButtonComponents/Submitbutton";
import { ErrorValidation } from "../../components/ErrorValidation";
import { formPhoneNumber } from "../../components/globalFunctions";
import type { IProviderSignup } from "../../Interfaces/IProviderSignUp";
import { registerProvider } from "../../services/authService";

/* ============================
   STEP 1: Representative Form
============================ */

interface IProviderRepForm {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  job_title: string;
}

/* ============================
   STEP 2: Home Info Form
============================ */

interface IProviderHomeInfoForm {
  adult_home_name: string;
  adult_home_email: string;
  adult_home_phone: string;
  adult_home_state: string;
  adult_home_city: string;
  adult_home_street: string;
  adult_home_zipcode: string;
  adult_home_website?: string;
  homeDescription: string;
}

export const ProviderSignup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [step1Data, setStep1Data] = useState<IProviderRepForm | null>(null);

  /* ============================
     STEP 1 FORM
  ============================ */

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<IProviderRepForm>({ mode: "onChange" });

  /* ============================
     STEP 2 FORM
  ============================ */

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2, isValid: isValid2 },
  } = useForm<IProviderHomeInfoForm>({ mode: "onChange" });

  /* ============================
     STEP 1 SUBMIT
  ============================ */

  const handleRepSubmit: SubmitHandler<IProviderRepForm> = (data) => {
    setStep1Data(data);
    setStep(2);
  };

  /* ============================
     STEP 2 SUBMIT
  ============================ */

  const handleHomeInfoSubmit: SubmitHandler<IProviderHomeInfoForm> = async (
    data
  ) => {
    if (!step1Data) return;

    try {
      const payload: IProviderSignup = {
        first_name: step1Data.first_name,
        last_name: step1Data.last_name,
        email: step1Data.email,
        password: step1Data.password,
        confirmPassword: step1Data.confirm_password,
        phone_number: step1Data.phone_number,
        job_title: step1Data.job_title,

        adult_home_name: data.adult_home_name,
        adult_home_email: data.adult_home_email,
        adult_home_phone: data.adult_home_phone,
        adult_home_state: data.adult_home_state,
        adult_home_city: data.adult_home_city,
        adult_home_street: data.adult_home_street,
        adult_home_zipcode: data.adult_home_zipcode,
        adult_home_website: data.adult_home_website,
        homeDescription: data.homeDescription,
      };

      await registerProvider(payload);

      toast.success("Provider account created successfully!");
      navigate("/login", { replace: true });
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  /* ============================
     ANIMATION
  ============================ */

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
            animate={{ width: step === 1 ? "50%" : "100%" }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <p className="text-center text-sm mt-2 text-gray-600">
          Step {step} of 2
        </p>
      </div>

      {/* FORM CONTAINER */}
      <div className="relative mx-auto w-[90%] md:w-[80%] rounded-lg overflow-hidden min-h-[500px]">
        <AnimatePresence custom={direction} mode="wait">

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="bg-gray-200 grid md:grid-cols-3 py-5 px-3 md:px-6 rounded-lg gap-4"
            >
              <div className="space-y-2">
                <h5 className="text-blue-500 text-[18px] font-semibold">
                  Home Representative
                </h5>
                <p className="text-sm text-gray-600">
                  Enter your personal information
                </p>
              </div>

              <div className="col-span-2 bg-white rounded p-4">
                <form
                  onSubmit={handleSubmit(handleRepSubmit)}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label>First Name *</label>
                      <input {...register("first_name", { required: true })} className="border border-gray-400 rounded px-3 py-2" />
                      {errors.first_name && <ErrorValidation error="Required" />}
                    </div>

                    <div className="flex flex-col">
                      <label>Last Name *</label>
                      <input {...register("last_name", { required: true })} className="border border-gray-400 rounded px-3 py-2" />
                      {errors.last_name && <ErrorValidation error="Required" />}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label>Email *</label>
                      <input type="email" {...register("email", { required: true })} className="border border-gray-400 rounded px-3 py-2" />
                      {errors.email && <ErrorValidation error="Required" />}
                    </div>

                    <div className="flex flex-col">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        {...register("phone_number", {
                          required: true,
                          onChange: (e) =>
                            (e.target.value = formPhoneNumber(e.target.value)),
                        })}
                        className="border border-gray-400 rounded px-3 py-2"
                      />
                      {errors.phone_number && <ErrorValidation error="Required" />}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label>Password *</label>
                      <input type="password" {...register("password", { required: true })} className="border border-gray-400 rounded px-3 py-2" />
                      {errors.password && <ErrorValidation error="Required" />}
                    </div>

                    <div className="flex flex-col">
                      <label>Confirm Password *</label>
                      <input
                        type="password"
                        {...register("confirm_password", {
                          required: true,
                          validate: (val) =>
                            val === watch("password") ||
                            "Passwords must match",
                        })}
                        className="border border-gray-400 rounded px-3 py-2"
                      />
                      {errors.confirm_password && (
                        <ErrorValidation error="Passwords must match" />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col md:w-1/2">
                    <label>Job Title *</label>
                    <input {...register("job_title", { required: true })} className="border border-gray-400 rounded px-3 py-2" />
                    {errors.job_title && <ErrorValidation error="Required" />}
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <div>
                      Already have an account?{" "}
                      <Link to="/login" className="text-blue-500 underline">
                        Login
                      </Link>
                    </div>
                    <Submitbutton value="Next" type="submit" disabled={!isValid} />
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="bg-gray-200 grid md:grid-cols-3 py-5 px-3 md:px-6 rounded-lg gap-4"
            >
              <div className="space-y-2">
                <h5 className="text-blue-500 text-[18px] font-semibold">
                  Home Information
                </h5>
                <p className="text-sm text-gray-600">
                  Enter your home/facility information
                </p>
              </div>

              <div className="col-span-2 bg-white rounded p-4">
                <form onSubmit={handleSubmit2(handleHomeInfoSubmit)} className="space-y-4">

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label>Home Name *</label>
                      <input {...register2("adult_home_name", { required: true })} className="border border-gray-400 rounded px-3 py-2" />
                      {errors2.adult_home_name && <ErrorValidation error="Required" />}
                    </div>

                    <div className="flex flex-col">
                      <label>Website</label>
                      <input {...register2("adult_home_website")} className="border border-gray-400 rounded px-3 py-2" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label>Work Email *</label>
                      <input type="email" {...register2("adult_home_email", { required: true })} className="border border-gray-400 rounded px-3 py-2" />
                      {errors2.adult_home_email && <ErrorValidation error="Required" />}
                    </div>

                    <div className="flex flex-col">
                      <label>Phone *</label>
                      <input
                        type="tel"
                        {...register2("adult_home_phone", {
                          required: true,
                          onChange: (e) =>
                            (e.target.value = formPhoneNumber(e.target.value)),
                        })}
                        className="border border-gray-400 rounded px-3 py-2"
                      />
                      {errors2.adult_home_phone && <ErrorValidation error="Required" />}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label>State *</label>
                      <input {...register2("adult_home_state", { required: true })} className="border border-gray-400 rounded px-3 py-2" />
                      {errors2.adult_home_state && <ErrorValidation error="Required" />}
                    </div>

                    <div className="flex flex-col">
                      <label>City *</label>
                      <input {...register2("adult_home_city", { required: true })} className="border border-gray-400 rounded px-3 py-2" />
                      {errors2.adult_home_city && <ErrorValidation error="Required" />}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label>Street *</label>
                      <input {...register2("adult_home_street", { required: true })} className="border border-gray-400 rounded px-3 py-2" />
                      {errors2.adult_home_street && <ErrorValidation error="Required" />}
                    </div>

                    <div className="flex flex-col">
                      <label>Zipcode *</label>
                      <input {...register2("adult_home_zipcode", { required: true })} className="border border-gray-400 rounded px-3 py-2" />
                      {errors2.adult_home_zipcode && <ErrorValidation error="Required" />}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label>Home Description *</label>
                    <textarea
                      rows={4}
                      {...register2("homeDescription", { required: true })}
                      className="border border-gray-400 rounded px-3 py-2"
                    />
                    {errors2.homeDescription && <ErrorValidation error="Required" />}
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button type="button" className="text-blue-500 underline" onClick={() => setStep(1)}>
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