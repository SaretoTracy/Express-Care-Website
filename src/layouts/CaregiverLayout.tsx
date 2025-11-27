import { Outlet } from "react-router-dom";
import { CaregiverNavbar } from "../components/Navbar/CaregiverNavbar";


const CaregiverLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CaregiverNavbar />
      <main className=" mx-auto w-full">
        <Outlet /> 
      </main>
    </div>
  );
};

export default CaregiverLayout;
