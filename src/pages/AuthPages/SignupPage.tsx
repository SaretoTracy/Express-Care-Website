import React from "react";
import { FaUserCircle, FaBriefcase } from "react-icons/fa";
import { YellowLink } from "../../components/ButtonComponents/YellowLink";
export const SignupPage: React.FC<{}> = () => {
  return (
    <div className='my-10 space-y-4'>
      <h3 className='text-center text-blue-500 text-[22px] font-bold '>
        Create Your Account
      </h3>
      <div className='grid md:grid-cols-2 md:gap-2 space-y-4 md:space-y-0 '>
        <div className='border-[1px] border-gray-200 mx-[10px] rounded space-y-4 py-5 px-1 lg:w-[500px] lg:justify-self-end '>
          <div className='flex justify-center'>
            <FaUserCircle className='text-yellow-400 text-[80px]' />
          </div>
          <h5 className='font-bold  text-[20px] text-blue-500 text-center'>
            Caregiver
          </h5>
          <p className='text-center text-blue-500'>
            Are you looking for your dream job? <br /> Create a unique career
            profile with Express Care Team
          </p>

          <div className='flex justify-center'>
            <YellowLink
              btnPro={"Sign up as caregiver"}
              linkTo={"/caregiver/signup"}
            />
          </div>
        </div>
        <div className='border-[1px] border-gray-200 mx-[10px] rounded space-y-4 py-5 px-1 lg:w-[500px] lg:justify-self-start '>
          <div className='flex justify-center'>
            <FaBriefcase className='text-yellow-400 border-transparent text-[80px]  ' />
          </div>
          <h5 className='font-bold  text-[20px] text-blue-500 text-center'>
            Provider
          </h5>
          <p className='text-center text-blue-500'>
            Are you looking for quality candidates? <br /> Advertise and search
            with Express Care Team
          </p>

          <div className='flex justify-center'>
            <YellowLink
              btnPro={"Sign up as provider"}
              linkTo={"/provider/signup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
