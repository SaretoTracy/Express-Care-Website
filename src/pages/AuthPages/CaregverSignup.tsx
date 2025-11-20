import React, { useContext, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Submitbutton } from "../../components/ButtonComponents/Submitbutton";
import { ErrorValidation } from "../../components/ErrorValidation";
import { formPhoneNumber } from "../../components/globalFunctions";
import { toast } from "react-toastify";
import { SwitchToggleContext } from "../../context/GeneralContext";
import type { ICaregiverSignup } from "../../Interfaces/ICaregiverSignUp";
import { caregiverSignupValidator } from "../../validation/signupValidation";
import { registerCaregiver } from "../../services/authService";

export const CaregiverSignup: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(SwitchToggleContext);
  const switchSpinnerOn = context?.switchSpinnerOn ?? (() => {});
  const switchSpinnerOff = context?.switchSpinnerOff ?? (() => {});

  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ICaregiverSignup>();

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleSignupSubmit: SubmitHandler<ICaregiverSignup> = async (data) => {
    switchSpinnerOn();

    try {
      // Validate with Zod
      const validated = caregiverSignupValidator.parse(data);

      // Prepare payload for backend
      const payload = {
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email,
        password: validated.password,
        confirmPassword:validated.confirmPassword,
        dateOfBirth: validated.dateOfBirth.toString(), 
        gender: validated.gender,
        phoneNumber: validated.phoneNumber,
        city: validated.city,
        state: validated.state,
        street: validated.street,
        zipcode: validated.zipcode,
        role: "Caregiver",
      };

      // Call live backend API
      await registerCaregiver(payload);

      toast.success("Account created successfully!");
      navigate("/login", { replace: true });
    } catch (error: any) {
      if (error?.errors) {
        // Zod validation error
        toast.error(error.errors[0].message);
      } else if (error.response?.data?.message) {
        // Backend error message
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message || "An unexpected error occurred");
      }
    } finally {
      switchSpinnerOff();
    }
  };

  return (
    <div className="my-10 space-y-4">
      <h3 className="text-center text-yellow-400 text-[25px] font-bold">
        Create a Caregiver's Account
      </h3>
      <p className="text-center text-blue-500">Your dream job is one click away</p>

      <div className="bg-gray-200 mx-auto rounded-lg w-[90%] grid md:grid-cols-3 py-5 px-1 md:px-5">
        <div>
          <h5 className="text-blue-500 text-[18px]">Personal information</h5>
          <p>This information pertains to you as an individual</p>
        </div>

        <div className="col-span-2 rounded bg-white">
          <form
            className="px-2 space-y-3 py-3"
            onSubmit={handleSubmit(handleSignupSubmit)}
          >
            {/* FIRST + LAST NAME */}
            <div className="space-y-3 md:space-y-0 md:grid grid-cols-2 md:space-x-3">
              <div className="flex flex-col">
                <label className="text-gray-700">
                  First Name <sup className="text-rose-700">*</sup>
                </label>
                <input
                  type="text"
                  className={`border border-gray-400 rounded focus:outline-[1px] ${
                    errors.firstName
                      ? "focus:outline-red-500"
                      : "focus:outline-yellow-400"
                  }`}
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && <ErrorValidation error="field cannot be empty" />}
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700">
                  Last Name <sup className="text-rose-700">*</sup>
                </label>
                <input
                  type="text"
                  className={`border border-gray-400 rounded focus:outline-[1px] ${
                    errors.lastName
                      ? "focus:outline-red-500"
                      : "focus:outline-yellow-400"
                  }`}
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && <ErrorValidation error="field cannot be empty" />}
              </div>
            </div>

            {/* EMAIL + PASSWORD */}
            <div className="space-y-3 md:space-y-0 md:grid grid-cols-2 md:space-x-3">
              <div className="flex flex-col">
                <label className="text-gray-700">
                  Email <sup className="text-rose-700">*</sup>
                </label>
                <input
                  type="email"
                  className={`border border-gray-400 rounded focus:outline-[1px] ${
                    errors.email ? "focus:outline-red-500" : "focus:outline-yellow-400"
                  }`}
                  {...register("email", { required: true })}
                />
                {errors.email && <ErrorValidation error="please check your email" />}
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700">
                  Password <sup className="text-rose-700">*</sup>
                </label>
                <input
                  type="password"
                  className={`border border-gray-400 rounded focus:outline-[1px] ${
                    errors.password ? "focus:outline-red-500" : "focus:outline-yellow-400"
                  }`}
                  {...register("password", { required: true })}
                />
                {errors.password && <ErrorValidation error="Invalid password format" />}
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="md:grid grid-cols-2 md:space-x-3">
              <div className="flex flex-col">
                <label className="text-gray-700">
                  Confirm Password <sup className="text-rose-700">*</sup>
                </label>
                <input
                  type="password"
                  className={`border border-gray-400 rounded focus:outline-[1px] ${
                    errors.confirmPassword ? "focus:outline-red-500" : "focus:outline-yellow-400"
                  }`}
                  {...register("confirmPassword", { required: true })}
                />
                {errors.confirmPassword && <ErrorValidation error="your password does not match" />}
              </div>
            </div>

            <hr />

            {/* DOB + GENDER */}
            <div className="space-y-3 md:space-y-0 md:grid grid-cols-2 md:space-x-3">
              <div className="flex flex-col">
                <label className="text-gray-700">
                  Date of birth <sup className="text-rose-700">*</sup>
                </label>
                <input
                  type="date"
                  className={`border border-gray-400 rounded focus:outline-[1px] ${
                    errors.dateOfBirth ? "focus:outline-red-500" : "focus:outline-yellow-400"
                  }`}
                  {...register("dateOfBirth", { required: true })}
                />
                {errors.dateOfBirth && <ErrorValidation error="field cannot be empty" />}
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700">
                  Gender <sup className="text-rose-700">*</sup>
                </label>
                <select
                  className={`border border-gray-400 rounded focus:outline-[1px] bg-white ${
                    errors.gender ? "focus:outline-red-500" : "focus:outline-yellow-400"
                  }`}
                  {...register("gender", { required: true })}
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <ErrorValidation error="please select your gender" />}
              </div>
            </div>

            {/* ADDRESS FIELDS */}
            <div className="space-y-3 md:grid grid-cols-2 md:space-x-3">
              <div className="flex flex-col">
                <label className="text-gray-700">State*</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded focus:outline-[1px]"
                  {...register("state", { required: true })}
                />
                {errors.state && <ErrorValidation error="field cannot be empty" />}
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700">City*</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded focus:outline-[1px]"
                  {...register("city", { required: true })}
                />
                {errors.city && <ErrorValidation error="field cannot be empty" />}
              </div>
            </div>

            <div className="space-y-3 md:grid grid-cols-2 md:space-x-3">
              <div className="flex flex-col">
                <label className="text-gray-700">Zipcode*</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded"
                  {...register("zipcode", { required: true })}
                />
                {errors.zipcode && <ErrorValidation error="field cannot be empty" />}
              </div>

              <div className="flex flex-col">
                <label className="text-gray-700">Street*</label>
                <input
                  type="text"
                  className="border border-gray-400 rounded"
                  {...register("street", { required: true })}
                />
                {errors.street && <ErrorValidation error="field cannot be empty" />}
              </div>
            </div>

            {/* PHONE NUMBER */}
            <div className="flex flex-col">
              <label className="text-gray-700">
                Phone number <sup className="text-rose-700">*</sup>
              </label>
              <input
                type="tel"
                {...register("phoneNumber", { required: true, minLength: 10 })}
                onChange={handlePhoneNumberChange}
                value={phoneNumber}
                className={`border border-gray-400 rounded focus:outline-[1px] ${
                  errors.phoneNumber ? "focus:outline-red-500" : "focus:outline-yellow-400"
                }`}
              />
              {errors.phoneNumber && <ErrorValidation error="Enter a valid phone number" />}
            </div>

            {/* TERMS */}
            <div>
              <input type="checkbox" {...register("terms", { required: true })} />
              <label>
                {" "}
                I agree to all the{" "}
                <Link to="" className="text-blue-500 underline">
                  Terms and Conditions
                </Link>
              </label>
              {errors.terms && <ErrorValidation error="You must accept the terms and conditions to proceed" />}
            </div>

            {/* LOGIN LINK */}
            <div>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 underline">
                Login
              </Link>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-end">
              <Submitbutton value="Create Your Account" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
