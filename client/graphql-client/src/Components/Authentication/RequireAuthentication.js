import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../../store/AuthProvider";

const RequireAuthentication = ({ allowedRoles }) => {
  const authCtx = useContext(AuthContext);
  const location = useLocation();

  return allowedRoles?.includes(authCtx?.userDetails?.role) ? (
    <Outlet />
  ) : authCtx.isAuthenticated ? (
    <Navigate to="/unauthorised" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuthentication;
