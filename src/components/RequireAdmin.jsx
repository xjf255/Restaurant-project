import { Navigate, useLocation } from "react-router-dom";

export const RequireAdmin = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const loc = useLocation();

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: loc }} />;
  }
  return <>{children}</>;
};
