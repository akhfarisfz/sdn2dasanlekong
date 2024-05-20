import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { ContextApplication } from "../libs/config/contexts.js";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole } = useContext(ContextApplication);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
