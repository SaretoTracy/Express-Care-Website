import { Outlet } from "react-router-dom";
import { ProviderNavbar } from "../components/Navbar/ProviderNavbar";


const ProviderLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ProviderNavbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <Outlet /> {/* This will render nested route content */}
      </main>
    </div>
  );
};

export default ProviderLayout;
