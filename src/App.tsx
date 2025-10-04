import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { SwitchProvider } from "./context/GeneralContext";
import PublicRoutes from "./routes/PublicRoutes ";
import ScrollToTop from "./components/ScrollToTop";


function App() {
  return (
    <>
    
    <SwitchProvider>
      <LoadingSpinner />
    
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        {PublicRoutes()}

     

      

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
    <ToastContainer />
    </SwitchProvider>
  </>
  );
}

export default App;
