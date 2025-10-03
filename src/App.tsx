// App.tsx
import PublicRoutes from "./routes/PublicRoutes ";
import { ToastContainer } from "react-toastify";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { SwitchProvider } from "./context/GeneralContext";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <SwitchProvider>
      <LoadingSpinner />

      <Routes>
        {/* Public Routes */}
        {PublicRoutes()}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer />
    </SwitchProvider>
  );
}

export default App;
