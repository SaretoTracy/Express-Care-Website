import React, { useContext, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Submitbutton } from "../../components/ButtonComponents/Submitbutton";
import { ErrorValidation } from "../../components/ErrorValidation";
import { formPhoneNumber } from "../../components/globalFunctions";
import { toast } from "react-toastify";
import { SwitchToggleContext } from "../../context/GeneralContext";
import type { ICaregiverSignup } from "../../Interfaces/ICaregiverSignUp";

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

  const handleSignupSubmit: SubmitHandler<ICaregiverSignup> = () => {
  
    switchSpinnerOn();
    
    
    setTimeout(() => {
      switchSpinnerOff();
      toast.info("Feature coming soon!");
      navigate("/comingsoon", { replace: true });
    }, 500);
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
           <div className=' space-y-3 md:space-y-0 md:grid grid-cols-2 md:space-x-3'>
              <div className='flex flex-col  '>
                <label htmlFor='firstName' className='text-gray-700'>
                  First Name <sup className='text-rose-700'>*</sup>
                </label>
                <input
                  type='text'
                  className={` border-[1px] border-gray-400 rounded focus:outline-[1px] ${
                    errors.firstName
                      ? "focus:outline-red-500"
                      : "focus:outline-yellow-400"
                  } `}
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <ErrorValidation error={"field cannot be empty"} />
                )}
              </div>
              <div className='flex flex-col '>
                <label htmlFor='lastName' className='text-gray-700'>
                  Last Name <sup className='text-rose-700'>*</sup>
                </label>
                <input
                  type='text'
                  className={` border-[1px] border-gray-400 rounded focus:outline-[1px] ${
                    errors.lastName
                      ? "focus:outline-red-500"
                      : "focus:outline-yellow-400"
                  }`}
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <ErrorValidation error={"field cannot be empty"} />
                )}
              </div>
            </div>
            <div className=' space-y-3 md:space-y-0 md:grid grid-cols-2 md:space-x-3'>
              <div className='flex flex-col '>
                <label htmlFor='email' className='text-gray-700'>
                  Email<sup className='text-rose-700'>*</sup>
                </label>
                <input
                  type='email'
                  className={` border-[1px] border-gray-400 rounded focus:outline-[1px] ${
                    errors.email
                      ? "focus:outline-red-500"
                      : "focus:outline-yellow-400"
                  }`}
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors.email && (
                  <ErrorValidation error={"please check your email"} />
                )}
              </div>
              <div className='flex flex-col '>
                <label htmlFor='password' className='text-gray-700'>
                  Password<sup className='text-rose-700'>*</sup>
                </label>
                <input
                  type='password'
                  className={` border-[1px] border-gray-400 rounded focus:outline-[1px] ${
                    errors.password
                      ? "focus:outline-red-500"
                      : "focus:outline-yellow-400"
                  }`}
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                  })}
                />
                {errors.password?.type === "required" && (
                  <ErrorValidation error={"field cannot be empty"} />
                )}
                {errors.password?.type === "pattern" && (
                  <ErrorValidation
                    error={
                      "password should contain atleast one capital, one small letter, one number and characters between 6 to 15"
                    }
                  />
                )}
              </div>
            </div>
            <div className='  md:space-y-0 md:grid grid-cols-2 md:space-x-3'>
              <div className='flex flex-col  '>
                <label htmlFor='confirmPassword' className='text-gray-700'>
                  Confirm Password<sup className='text-rose-700'>*</sup>
                </label>
                <input
                  type='password'
                  className={` border-[1px] border-gray-400 rounded focus:outline-[1px] ${
                    errors.confirmPassword
                      ? "focus:outline-red-500"
                      : "focus:outline-yellow-400"
                  } `}
                  {...register("confirmPassword", {
                    required: true,
                    validate: (val: string) => {
                      return watch("password") === val;
                    },
                  })}
                />
                {errors.confirmPassword?.type === "required" && (
                  <ErrorValidation error={"field cannot be empty"} />
                )}
                {errors.confirmPassword?.type === "validate" && (
                  <ErrorValidation error={"your password does not match"} />
                )}
              </div>
            </div>
            <hr />
            <div className=' space-y-3 md:space-y-0 md:grid grid-cols-2 md:space-x-3'>
              <div className='flex flex-col '>
                <label htmlFor='dob' className='text-gray-700'>
                  Date of birth<sup className='text-rose-700'>*</sup>
                </label>
                <input
                  type='date'
                  className={` border-[1px] border-gray-400 rounded focus:outline-[1px] ${
                    errors.dob
                      ? "focus:outline-red-500"
                      : "focus:outline-yellow-400"
                  } `}
                  {...register("dob", { required: true })}
                />
                {errors.dob && (
                  <ErrorValidation error={"field cannot be empty"} />
                )}
              </div>
              <div className='flex flex-col'>
                <label htmlFor='gender' className='text-gray-700'>
                  Gender<sup className='text-rose-700'>*</sup>
                </label>
                <select
                  className={` border-[1px] border-gray-400 rounded focus:outline-[1px] bg-white ${
                    errors.dob
                      ? "focus:outline-red-500"
                      : "focus:outline-yellow-400"
                  } `}
                  {...register("gender", { required: true })}
                  defaultValue=''
                >
                  <option value='' disabled>
                    Select your gender
                  </option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Other'>Other</option>
                </select>
                {errors.gender && (
                  <ErrorValidation error={"please select your gender"} />
                )}
              </div>
            </div>
            <div className=' space-y-3 md:space-y-0 md:grid grid-cols-2 md:space-x-3'>
              <div className='flex flex-col '>
                <label htmlFor='state' className='text-gray-700'>
                  State<sup className='text-rose-700'>*</sup>
                </label>
                <input
                  type='text'
                  className={` border-[1px] border-gray-400 rounded focus:outline-[1px] ${
                    errors.state
                      ? "focus:outline-red-500"
                      : "focus:outline-yellow-400"
                  }`}
                  {...register("state", { required: true })}
                />
                {errors.state && (
                  <ErrorValidation error={"field cannot be empty"} />
                )}
              </div>
              <div className='flex flex-col '>
                <label htmlFor='city' className='text-gray-700'>
                  City<sup className='text-rose-700'>*</sup>
                </label>
                <input
                  type='text'
                  className={` border-[1px] border-gray-400 rounded focus:outline-[1px] ${
                    errors.city
                      ? "focus:outline-red-500"
                      : "focus:outline-yellow-400"
                  }`}
                  {...register("city", { required: true })}
                />
                {errors.city && (
                  <ErrorValidation error={"field cannot be empty"} />
                )}
              </div>
            </div>
            <div className=' space-y-3 md:space-y-0 md:grid grid-cols-2 md:space-x-3'>
              <div className='flex flex-col '>
                <label htmlFor='zipcode' className='text-gray-700'>
                  Zipcode<sup className='text-rose-700'>*</sup>
                </label>
                <input
                  type='text'
                  className={` border-[1px] border-gray-400 rounded focus:outline-[1px] ${
                    errors.zipcode
                      ? "focus:outline-red-500"
                      : "focus:outline-yellow-400"
                  }`}
                  {...register("zipcode", { required: true })}
                />
                {errors.zipcode && (
                  <ErrorValidation error={"field cannot be empty"} />
                )}
              </div>
              <div className='flex flex-col '>
                <label htmlFor='street' className='text-gray-700'>
                  street<sup className='text-rose-700'>*</sup>
                </label>
                <input
                  type='text'
                  className={` border-[1px] border-gray-400 rounded focus:outline-[1px] ${
                    errors.street
                      ? "focus:outline-red-500"
                      : "focus:outline-yellow-400"
                  }`}
                  {...register("street", { required: true })}
                />
                {errors.street && (
                  <ErrorValidation error={"field cannot be empty"} />
                )}
              </div>
            </div>
            
         
            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="text-gray-700">
                Phone number <sup className="text-rose-700">*</sup>
              </label>
              <input
                type="tel"
                {...register("phoneNumber", {
                  required: true,
                  minLength: 10,
                })}
                onChange={handlePhoneNumberChange}
                value={phoneNumber}
                className={`border border-gray-400 rounded focus:outline-[1px] ${
                  errors.phoneNumber
                    ? "focus:outline-red-500"
                    : "focus:outline-yellow-400"
                }`}
              />
              {errors.phoneNumber && (
                <ErrorValidation error={"Enter a valid phone number"} />
              )}
            </div>

        
            <div>
              <input
                type="checkbox"
                {...register("terms", { required: true })}
              />
              <label>
                {" "}
                I agree to all the{" "}
                <Link to="" className="text-blue-500 underline">
                  Terms and Conditions
                </Link>
              </label>
              {errors.terms && (
                <ErrorValidation
                  error={
                    "You must accept the terms and conditions to proceed"
                  }
                />
              )}
            </div>

           
            <div>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 underline">
                Login
              </Link>
            </div>

            <div className="flex justify-end">
              <Submitbutton value="Create Your Account" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};