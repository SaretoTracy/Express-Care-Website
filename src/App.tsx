import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { SwitchProvider } from "./context/GeneralContext";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import ScrollToTop from "./components/ScrollToTop";
import PublicRoutes from "./routes/PublicRoutes ";

function App() {
  return (
    <SwitchProvider>
      <LoadingSpinner />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          {PublicRoutes()}

          {/* Protected Routes */}
          {ProtectedRoutes()}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <ToastContainer />
    </SwitchProvider>
  );
}

export default App;
