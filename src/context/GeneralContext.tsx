import React, { useContext } from "react";
import { createContext, useState } from "react";

const SwitchContext = createContext<boolean>(false);
export const SwitchToggleContext = createContext<any>(null);
export const useSwitchContext = () => useContext(SwitchContext);
export const useSwitchUpdater = () => useContext(SwitchToggleContext);

export const SwitchProvider = ({ children }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleSwitch = () => setOpen(() => !open);
  const[openSpinner,setOpenSpinner]= useState<boolean>(false)
  
  const switchSpinnerOn=()=>setOpenSpinner(()=>true)
  const switchSpinnerOff=()=>setOpenSpinner(()=>false)
  return (
    <SwitchContext.Provider value={open}> 
      <SwitchToggleContext.Provider value={{toggleSwitch, openSpinner, switchSpinnerOn, switchSpinnerOff}}>
        {children}
      </SwitchToggleContext.Provider>
    </SwitchContext.Provider>
  );
};
