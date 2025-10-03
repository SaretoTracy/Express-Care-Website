import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="grid min-h-[100vh] text-gray-800">
      <NavBar />
      <div className="flex-grow">
        <Outlet />
      </div>
      
    </div>
  );
};

export default MainLayout;
