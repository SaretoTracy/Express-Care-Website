import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/Navbar/AdminNavbar";


export default function MainLayout() {
  return (
    <div id="Main" className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <AdminNavbar />
      <main className="flex-1 min-h-screen bg-white p-4 md:p-6 lg:p-8 md:ml-0 mt-16 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
}