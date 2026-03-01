import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ isLoggedin, children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from || "/";

  if (anonymous && isLoggedin) {
    return <Navigate to={from} replace />;
  }

  if (!anonymous && !isLoggedin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
