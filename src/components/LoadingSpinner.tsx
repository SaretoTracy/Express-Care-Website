import React from 'react'
import spinner from '../../public/loader-unscreen.gif'
import { useContext } from 'react';
import { SwitchToggleContext } from '../context/GeneralContext';

export const LoadingSpinner: React.FC<{}> = () => {
    const {openSpinner}= useContext(SwitchToggleContext)
    return (<>
       {openSpinner?( <div className='absolute top-0 bottom-0  right-0 left-0 flex justify-center items-center bg-translucent z-[100]'>
            <img src={spinner} alt="loading" />
        </div>):null}</>
    )
}