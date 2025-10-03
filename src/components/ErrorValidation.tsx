import React from "react";
interface IError {
  error: string;
}
export const ErrorValidation = (props: IError) => {
  return <small className='text-red-500 text-[12px]'>{props.error}</small>;
};
