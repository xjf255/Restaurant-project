import { Navigate, useLocation } from "react-router-dom";
import { AdminContext } from "../context/admin";
import { useContext } from "react";

export const RequireAdmin = ({ children }) => {
  const { isAdmin } = useContext(AdminContext);
  const loc = useLocation();

  if (!isAdmin) {
    return <Navigate to="/registration" replace state={{ from: loc }} />;
  }
  return <>{children}</>;
};
