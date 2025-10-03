import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes ";

function App() {
  return (
    <Router>
      <Routes>
        {PublicRoutes()}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
