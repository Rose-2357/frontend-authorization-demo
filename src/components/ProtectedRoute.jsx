import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedin, children }) {
  return isLoggedin ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
